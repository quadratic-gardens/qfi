// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {VkRegistry} from "./VkRegistry.sol";
import {Pairing} from "./Pairing.sol";
import {AccQueue} from "./AccQueue.sol";
import {Multicallable} from "./utils/Multicallable.sol";
import {PoseidonT3} from "./poseidon/PoseidonT3.sol";
import {PoseidonT4} from "./poseidon/PoseidonT4.sol";
import {PoseidonT5} from "./poseidon/PoseidonT5.sol";
import {PoseidonT6} from "./poseidon/PoseidonT6.sol";

import {ISignUpGatekeeper} from "./flavors/ISignUpGatekeeper.sol";
import {IInitialVoiceCreditProxy} from "./flavors/IInitialVoiceCreditProxy.sol";

/**
 * @author  Q
 * @title   Jubjub
 * @dev     Max VoteOptionTreeDepth is 5 (5^5 = 3125), Max MessageTreeDepth is 10 (5^10 = 9765625),
 *          Changing the voteOptionTreeDepth will change the empty ballot roots
 * @notice  Need to link Poseidon Libraries. Jubjub is the main contract that manages the state of the protocol,
 *          it contains the logic for the various state transitions that occur during the protocol.
 */
contract Jubjub is OwnableUpgradeable, Multicallable {
  uint256 internal constant SNARK_SCALAR_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
  uint256 internal constant PAD_PUBKEY_X = 10457101036533406547632367118273992217979173478358440826365724437999023779287;
  uint256 internal constant PAD_PUBKEY_Y = 19824078218392094440610104313265183977899662750282163392862422243483260492317;
  // BigInt( solidityPackedSha256( ['bytes'], [toUtf8Bytes('Maci')])) % SNARK_FIELD_SIZE
  uint256 internal constant NOTHING_UP_MY_SLEEVE = 8370432830353022751713833565135785980866757267633941821328460903436894336785;
  uint256 internal constant BLANK_STATE_LEAF_HASH = uint256(6769006970205099520508948723718471724660867171122235270773600567925038008762);
  uint256 internal constant BLANK_MESSAGE_LEAF_HASH = uint256(13538681568993277969463027820094671926946581652698677548910942555920874803124);

  uint256 constant TREE_ARITY = 5;
  uint256 constant MESSAGE_DATA_LENGTH = 10;

  uint256 public stateTreeDepth;
  uint256 public stateTreeSubDepth;
  uint256 public messageTreeDepth;
  uint256 public messageTreeSubDepth;
  uint256 public voteOptionTreeDepth;
  uint256[5] internal emptyBallotRoots;

  bool public isInitialised;
  uint256 public numPolls;
  uint256 public numSignUps;
  uint256 public numMessages;

  uint256 public coordinatorPubKeyHash;
  uint256 public numBatchesProcessed;
  uint256 public currentStateCommitment;
  uint256 public currentMessageCommitment;
  uint256 public currentBallotCommitment;
  uint256 public currentSbCommitment;

  mapping(uint256 => uint256) public stateLeafTimeStamps;
  mapping(uint256 => address) public polls;
  mapping(uint256 => address) public pollResults;

  enum MESSAGE_TYPE {
    INVALID,
    VOTE,
    TOPUP
  }

  // Contracts for the merkle trees that store MACI state and message leaves, respectively
  AccQueue public stateAq;
  AccQueue public messageAq;

  ISignUpGatekeeper public signUpGatekeeper;
  IInitialVoiceCreditProxy public voiceCreditProxy;

  VkRegistry public vkRegistry;
  PubKey public coordinatorPubKey;

  // Signup period starts upon deployment.
  uint256 public signUpTimestamp;
  uint256 public voteDeadline;
  uint256 public voteDurationSeconds;
  bool public signUpsOpen;

  struct PubKey {
    uint256 x;
    uint256 y;
  }

  struct EdDSASignature {
    uint256 R8x;
    uint256 R8y;
    uint256 S;
  }

  struct VerifyingKey {
    Pairing.G1Point alpha1;
    Pairing.G2Point beta2;
    Pairing.G2Point gamma2;
    Pairing.G2Point delta2;
    Pairing.G1Point[] ic;
  }

  struct Message {
    uint256 msgType;
    uint256[MESSAGE_DATA_LENGTH] data;
  }

  // PoseidonT5.hash4[PubkeyX, PubkeyY, voiceCreditBalance, timestamp]
  struct StateLeaf {
    PubKey pubKey;
    uint256 voiceCreditBalance;
    uint256 timestamp;
  }

  struct MessageLeaf {
    PubKey pubKey;
    Message encryptedMessage;
  }
  modifier afterInit() {
    require(isInitialised, "MACI: not initialised");
    _;
  }

  modifier isWithinVotingDeadline() {
    require(block.timestamp < voteDeadline, "ERROR_VOTING_PERIOD_PASSED");
    _;
  }

  // Events necessary to recreate maci state offchain
  event Init(ISignUpGatekeeper _signUpGatekeeper, IInitialVoiceCreditProxy _topupCredit);
  event SignUp(uint256 _stateIndex, PubKey _userPubKey, uint256 _voiceCreditBalance, uint256 _timestamp);
  event MergeMaciStateAqSubRoots(uint256 _pollId, uint256 _numSrQueueOps);
  event MergeMaciStateAq(uint256 _pollId);

  event DeployPoll(uint256 _pollId, address _pollAddr, PubKey _pubKey);
  event PublishMessage(Message _message, PubKey _encPubKey);

  event MergeMessageAqSubRoots(uint256 _numSrQueueOps);
  event MergeMessageAq(uint256 _messageRoot);

  constructor() {
    require(BLANK_STATE_LEAF_HASH == blankStateLeafHash(), "MACI: BLANK_STATE_LEAF_HASH is incorrect");
    require(BLANK_MESSAGE_LEAF_HASH == blankMessageLeafHash(), "MACI: BLANK_MESSAGE_LEAF_HASH is incorrect");
  }

  function hash(uint256 _left, uint256 _right) public view returns (uint256) {
    uint256[2] memory input;
    input[0] = _left;
    input[1] = _right;
    return PoseidonT3.hash2(input);
  }

  /**
   * @notice Hashes a message leaf into a single field element.
   * @param _message The message to hash.
   * @param _encPubKey The public key of the recipient.
   * @return uint256 The poseidon hash of the message leaf.
   */
  function hashMessageLeaf(Message memory _message, PubKey memory _encPubKey) public pure returns (uint256) {
    require(_message.data.length == 10, "Invalid message");
    uint256[5] memory n;
    n[0] = _message.data[0];
    n[1] = _message.data[1];
    n[2] = _message.data[2];
    n[3] = _message.data[3];
    n[4] = _message.data[4];

    uint256[5] memory m;
    m[0] = _message.data[5];
    m[1] = _message.data[6];
    m[2] = _message.data[7];
    m[3] = _message.data[8];
    m[4] = _message.data[9];

    return PoseidonT6.hash5([_message.msgType, PoseidonT6.hash5(n), PoseidonT6.hash5(m), _encPubKey.x, _encPubKey.y]);
  }

  /**
   * @notice Hashes a state leaf into a single field element.
   * @param _stateLeaf The state leaf to hash.
   * @return The poseidon hash of the state leaf.
   */
  function hashStateLeaf(StateLeaf memory _stateLeaf) public pure returns (uint256) {
    uint256[4] memory plaintext;
    plaintext[0] = _stateLeaf.pubKey.x;
    plaintext[1] = _stateLeaf.pubKey.y;
    plaintext[2] = _stateLeaf.voiceCreditBalance;
    plaintext[3] = _stateLeaf.timestamp;

    return PoseidonT5.hash4(plaintext);
  }

  /*
   * blankMessageLeafHash() returns the hash of a blank message leaf.
   * This is used to pad the message tree.
   */
  function blankMessageLeafHash() public pure returns (uint256) {
    uint256[10] memory _data = [NOTHING_UP_MY_SLEEVE, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    PubKey memory _padKey = PubKey(PAD_PUBKEY_X, PAD_PUBKEY_Y);
    Message memory _message = Message(uint256(1), _data);
    return hashMessageLeaf(_message, _padKey);

    // return uint256(keccak256("MACI")) % SNARK_SCALAR_FIELD;
  }

  /*
   * blankStateLeafHash() returns the hash of a blank state leaf.
   * This is used to pad the state tree.
   */
  function blankStateLeafHash() public pure returns (uint256) {
    PubKey memory _padKey = PubKey(PAD_PUBKEY_X, PAD_PUBKEY_Y);
    StateLeaf memory _stateLeaf = StateLeaf(_padKey, 0, 0);

    return hashStateLeaf(_stateLeaf);
  }

  /*
   * Initialise the various factory/helper contracts. This should only be run
   * once and it must be run before deploying the first Poll.
   * @param _vkRegistry The VkRegistry contract
   * @param _topupCredit The topupCredit contract
   * @param _stateTreeDepth The depth of the state tree
   * @param _stateTreeSubDepth The depth of the state tree sub tree
   * @param _messageTreeDepth The depth of the message tree
   * @param _messageTreeSubDepth The depth of the message tree sub tree
   * @param _emptyBallotRoots The empty ballot roots
   * @param _signUpGatekeeper The signup gatekeeper contract
   * @param _voiceCreditProxy The voice credit proxy contract
   * @param _stateAq The state aq contract
   * @param _vkRegistry The vk registry contract
   * @param _maci The poll processor contract
   */
  function initialize(
    uint256 _stateTreeDepth,
    uint256 _messageTreeDepth,
    uint256 _stateTreeSubDepth,
    uint256 _messageTreeSubDepth,
    uint256[] memory _emptyBallotRoots,
    ISignUpGatekeeper _signUpGatekeeper,
    IInitialVoiceCreditProxy _voiceCreditProxy,
    AccQueue _stateAq,
    AccQueue _messageAq
  ) external initializer {
    __Ownable_init();
    require(owner() != address(0), "Jubjub owner must be set");
    require(!isInitialised, "MACI: already initialised");

    signUpTimestamp = block.timestamp;
    signUpsOpen = true;
    isInitialised = true;

    signUpGatekeeper = _signUpGatekeeper;
    voiceCreditProxy = _voiceCreditProxy;

    // NOTE: allow to initialize with a non-blank state aq
    stateAq = _stateAq;
    messageAq = _messageAq;
    stateTreeDepth = _stateTreeDepth;
    stateTreeSubDepth = _stateTreeSubDepth;
    messageTreeDepth = _messageTreeDepth;
    messageTreeSubDepth = _messageTreeSubDepth;

    if (stateAq.numLeaves() == uint256(0)) {
      stateAq.enqueue(BLANK_STATE_LEAF_HASH);
    }
    require(messageAq.numLeaves() == 0, "MACI: message aq is not empty");
    {
      messageAq.enqueue(BLANK_MESSAGE_LEAF_HASH);
    }

    emptyBallotRoots[0] = _emptyBallotRoots[0];
    emptyBallotRoots[1] = _emptyBallotRoots[1];
    emptyBallotRoots[2] = _emptyBallotRoots[2];
    emptyBallotRoots[3] = _emptyBallotRoots[3];
    emptyBallotRoots[4] = _emptyBallotRoots[4];

    require(stateTreeSubDepth == stateAq.subDepth(), "INCORRECT SUBDEPTH");
    require(messageTreeSubDepth == messageAq.subDepth(), "INCORRECT SUBDEPTH");
    require(stateTreeDepth < stateAq.MAX_DEPTH(), "INCORRECT DEPTH");

    emit Init(_signUpGatekeeper, _voiceCreditProxy);
  }

  function setVkRegistry(VkRegistry _vkRegistry) public onlyOwner {
    vkRegistry = _vkRegistry;
  }

  /**
   * @notice  Allows any eligible user sign up. The sign-up gatekeeper should prevent
   *          double sign-ups or ineligible users from doing so.  This function will
   *          only succeed if the sign-up deadline has not passed. It also enqueues a
   *          fresh state leaf into the state AccQueue.
   * @dev     Note that the circuits only support up to (5 ** 10 - 1) signups
   * @param   _pubKey The user's desired public key.
   * @param   _signUpGatekeeperData Data to pass to the sign-up gatekeeper's register() function. For instance, the POAPGatekeeper or SignUpTokenGatekeeper requires this value to be the ABI-encoded token ID.
   * @param   _initialVoiceCreditProxyData Data to pass to the InitialVoiceCreditProxy, which allows it to determine how many voice credits this user should have.
   */
  function signUp(PubKey memory _pubKey, bytes memory _signUpGatekeeperData, bytes memory _initialVoiceCreditProxyData) public afterInit {
    // The circuits only support up to (5 ** 10 - 1) signups
    require(numSignUps < TREE_ARITY ** stateTreeDepth, "MACI: maximum number of signups reached");

    require(_pubKey.x < SNARK_SCALAR_FIELD && _pubKey.y < SNARK_SCALAR_FIELD, "MACI: _pubKey values should be less than the snark scalar field");
    require(signUpsOpen, "MACI: signups are closed");

    unchecked {
      numSignUps++;
    }

    // Register the user via the sign-up gatekeeper. This function should
    // throw if the user has already registered or if ineligible to do so.
    signUpGatekeeper.register(msg.sender, _signUpGatekeeperData);
    uint256 voiceCreditBalance = voiceCreditProxy.getVoiceCredits(msg.sender, _initialVoiceCreditProxyData);

    uint256 timestamp = block.timestamp;
    // Create a state leaf and enqueue it.
    uint256 stateLeaf = hashStateLeaf(StateLeaf(_pubKey, voiceCreditBalance, timestamp));
    uint256 stateIndex = stateAq.enqueue(stateLeaf);

    emit SignUp(stateIndex, _pubKey, voiceCreditBalance, timestamp);
  }

  /**
   * @notice  Publish a message to the message queue. This function will only succeed
   *          if the voting deadline has passed. It also enqueues a fresh message
   *          leaf into the message AccQueue.
   * @param   _message The message to publish.
   * @param   _encPubKey The public key of the recipient.
   */
  function publishMessage(Message memory _message, PubKey memory _encPubKey) public isWithinVotingDeadline {
    require(numMessages <= TREE_ARITY ** messageTreeDepth, "ERROR_MAX_MESSAGES_REACHED");
    require(_encPubKey.x < SNARK_SCALAR_FIELD && _encPubKey.y < SNARK_SCALAR_FIELD, "ERROR_INVALID_PUBKEY");
    require(voteDeadline > block.timestamp, "ERROR_VOTING_ENDED");

    unchecked {
      numMessages++;
    }
    _message.msgType = 1;
    uint256 messageLeaf = hashMessageLeaf(_message, _encPubKey);
    messageAq.enqueue(messageLeaf);

    emit PublishMessage(_message, _encPubKey);
  }

  function publishMessageBatch(Message[] calldata _messages, PubKey[] calldata _encPubKeys) external {
    uint256 batchSize = _messages.length;
    for (uint8 i = 0; i < batchSize; i++) {
      publishMessage(_messages[i], _encPubKeys[i]);
    }
  }

  /*
   * The first step of merging the MACI state AccQueue. This allows the
   * ProcessMessages circuit to access the latest state tree and ballots via
   * currentSbCommitment.
   */
  function mergeStateAqSubRoots(uint256 _numSrQueueOps) public onlyOwner {
    // TODO: validate this is correct, should be able to merge on next round
    // This function cannot be called after the stateAq was merged
    require(!stateAq.treeMerged() && !signUpsOpen, "ERROR_STATE_AQ_ALREADY_MERGED");

    if (!stateAq.subTreesMerged()) {
      stateAq.mergeSubRoots(_numSrQueueOps);
    }

    emit MergeMaciStateAqSubRoots(numPolls, _numSrQueueOps);
  }

  /*
   * The second step of merging the MACI state AccQueue. This allows the
   * ProcessMessages circuit to access the latest state tree and ballots via
   * currentSbCommitment.
   * @param _pollId The ID of the Poll
   */
  function mergeStateAq() public onlyOwner {
    // This function can only be called if the stateAq subtrees are merged and signups are closed.
    require(!stateAq.treeMerged() && !signUpsOpen, "ERROR_STATE_AQ_ALREADY_MERGED");
    require(stateAq.subTreesMerged() == true, "ERROR_STATE_AQ_SUBTREES_NEED_MERGE");

    // Set currentStateRootCommitment,
    currentStateCommitment = stateAq.merge(stateTreeDepth);

    emit MergeMaciStateAq(currentStateCommitment);
  }

  /*
   * Called to open a new poll or to reset the current poll in the case of an invalid state transition.
   */
  function resetBallotCommitment(uint256 _voteOptionTreeDepth) public onlyOwner {
    // This functionshould be called once the stateAq is merged and signups are closed.
    // require(!stateAq.subTreesMerged(), "ERROR_STATE_AQ_SUBTREES_NEED_MERGE");
    require(!signUpsOpen, "SIGNUPS_NOT_CLOSED");
    // Reset currentBallotRootCommitment
    currentBallotCommitment = emptyBallotRoots[_voteOptionTreeDepth - 1];
    // Reset currentSbCommitment, hash
    currentSbCommitment = PoseidonT4.hash3([currentStateCommitment, currentBallotCommitment, uint256(0)]);
  }

  /*
   * Deploy a new Poll contract.
   * @param _duration How long should the Poll last for
   * @param _treeDepths The depth of the Merkle trees
   */
  function startVoting(uint256 _voteOptionTreeDepth, uint256 _duration, PubKey memory _coordinatorPubKey) public afterInit {
    require(!stateAq.treeMerged(), "ERROR_STATE_AQ_ALREADY_MERGED");
    require(!stateAq.subTreesMerged(), "ERROR_STATE_AQ_SUBTREES_MERGED");
    require(messageAq.numLeaves() == 1, "ERROR_MESSAGE_AQ_NOT_EMPTY");

    signUpsOpen = false;
    resetBallotCommitment(_voteOptionTreeDepth);

    uint256[10] memory _data = [NOTHING_UP_MY_SLEEVE, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    PubKey memory _padKey = PubKey(PAD_PUBKEY_X, PAD_PUBKEY_Y);
    Message memory _message = Message(uint256(MESSAGE_TYPE.VOTE), _data);

    unchecked {
      numPolls++;
      numMessages++;
    }

    voteDurationSeconds = _duration;
    voteDeadline = block.timestamp + _duration;
    voteOptionTreeDepth = _voteOptionTreeDepth;

    // messageAq = _messageAq;
    // messageAq.enqueue(BLANK_MESSAGE_LEAF_HASH); //SAVE GAS AND PRECOMPUTE

    coordinatorPubKey = _coordinatorPubKey;
    coordinatorPubKeyHash = PoseidonT3.hashLeftRight(_coordinatorPubKey.x, _coordinatorPubKey.y);
    numBatchesProcessed = 0;

    emit DeployPoll(numPolls, address(this), _coordinatorPubKey);
    emit PublishMessage(_message, _padKey);
  }

  /*
   * The first step in merging the message AccQueue so that the
   * ProcessMessages circuit can access the message root.
   */
  function mergeMessageAqSubRoots(uint256 _numSrQueueOps) public onlyOwner {
    require(!messageAq.treeMerged() && !signUpsOpen, "ERROR_MESSAGE_AQ_ALREADY_MERGED");

    if (!messageAq.subTreesMerged()) {
      messageAq.mergeSubRoots(_numSrQueueOps);
    }
    emit MergeMessageAqSubRoots(_numSrQueueOps);
  }

  /*
   * The second step in merging the message AccQueue so that the
   * ProcessMessages circuit can access the message root.
   */
  function mergeMessageAq() public onlyOwner {
    // This function can only be called if the stateAq subtrees are merged and signups are closed.
    require(!messageAq.treeMerged(), "ERROR_MESSAGE_AQ_ALREADY_MERGED");
    require(messageAq.subTreesMerged() == true, "ERROR_MESSAGE_AQ_SUBTREES_NEED_MERGE");

    // Set currentStateRootCommitment,
    currentMessageCommitment = messageAq.merge(messageTreeDepth);

    emit MergeMessageAq(currentMessageCommitment);
  }

  function calculateCurrentMessageBatchIndex() public view returns (uint256) {
    uint256 messageBatchSize = 5 ** messageTreeSubDepth;
    uint256 paddingForFirstBatch = numMessages % messageBatchSize;
    if (numBatchesProcessed == 0) {
      if (paddingForFirstBatch == 0) {
        return (numMessages / messageBatchSize) * messageBatchSize;
      } else {
        return numMessages;
      }
    } else {
      if (paddingForFirstBatch == 0) {
        return numMessages - numBatchesProcessed * messageBatchSize;
      } else {
        return numMessages - paddingForFirstBatch - ((numBatchesProcessed - 1) * messageBatchSize);
      }
    }
  }

  /*
   * Update the Poll's currentSbCommitment if the proof is valid.
   * @param _poll The poll to update
   * @param _newSbCommitment The new state root and ballot root commitment
   *                         after all messages are processed
   * @param _proof The zk-SNARK proof
   */
  function processMessages(uint256 _newStateCommitment, uint256 _newSbCommitment, uint256[8] memory _proof) public onlyOwner {
    // This function can only be called if the stateAq is merged and signups are closed.
    require(stateAq.treeMerged(), "ERROR_STATE_AQ_NOT_MERGED");
    require(messageAq.treeMerged(), "ERROR_MESSAGE_AQ_NOT_ALREADY_MERGED");
    require(calculateCurrentMessageBatchIndex() > 0, "ERROR_NO_MORE_MESSAGES");
    // There must be unprocessed messages,

    // Require that the message queue has been merged
    uint256 messageRoot = messageAq.getMainRoot(messageTreeDepth);
    require(messageRoot != 0, "ERROR_MESSAGE_AQ_NOT_MERGED");

    uint256 messageBatchSize = 5 ** messageTreeSubDepth;

    // Get the verifying key from the VkRegistry
    VkRegistry.VerifyingKey memory vk = vkRegistry.getProcessVk(stateTreeDepth, messageTreeDepth, voteOptionTreeDepth, messageBatchSize);

    bool isValid = true;
    uint256 currentMessageBatchIndex = calculateCurrentMessageBatchIndex();
    //TODO: refactor process proof
    // maci.verifyProcessProof(
    //     currentMessageBatchIndex,
    //     _newSbCommitment,
    //     _proof,
    //     vk,
    //     numMessages,
    //     messageRoot,
    //     currentSbCommitment,
    //     coordinatorPubKeyHash,
    //     5**voteOptionTreeDepth, //NOTE: max vote options
    //     5**messageTreeSubDepth // NOTE: messageBatchSize
    // );
    require(isValid, "ERROR_INVALID_PROCESS_MESSAGE_PROOF");

    {
      currentSbCommitment = _newSbCommitment;
      numBatchesProcessed++;
    }
  }

  function openSignUpPeriod() public onlyOwner {
    require(!signUpsOpen, "ERROR_SIGNUPS_ALREADY_OPEN");
    signUpsOpen = true;
  }
}
