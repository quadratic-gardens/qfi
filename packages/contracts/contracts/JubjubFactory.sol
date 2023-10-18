// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Jubjub} from "./Jubjub.sol";
import {AccQueue, AccQueueQuinary} from "./AccQueue.sol";
import {StateTree} from "./StateTree.sol";
import {MessageTree} from "./MessageTree.sol";
import {Multicallable} from "./utils/Multicallable.sol";
import {LibClone} from "./utils/LibClone.sol";
import {VkRegistry} from "./VkRegistry.sol";
import {ISignUpGatekeeper} from "./flavors/ISignUpGatekeeper.sol";
import {IInitialVoiceCreditProxy} from "./flavors/IInitialVoiceCreditProxy.sol";
import {Pairing} from "./Pairing.sol";

/// @title JubjubFactory
/// @notice This contract is used to deploy new Jubjubs
contract JubjubFactory is VkRegistry, Multicallable {
  /// -----------------------------------------------------------------------
  /// Library Usage
  /// -----------------------------------------------------------------------

  using LibClone for address; //hacks

  /// -----------------------------------------------------------------------
  /// Events
  /// -----------------------------------------------------------------------

  event JubjubDeployed(Jubjub indexed jubjub);
  event StateTreeDeployed(AccQueue indexed StateTree);
  event MessageTreeDeployed(AccQueue indexed MessageTree);

  /// -----------------------------------------------------------------------
  /// Immutables
  /// -----------------------------------------------------------------------

  uint256 internal STATE_TREE_SUBDEPTH = 3;
  uint256 internal MESSAGE_TREE_SUBDEPTH = 3;

  uint256[5] internal emptyBallotRoots;

  Jubjub public jubjubTemplate;
  StateTree internal stateTreeTemplate;
  MessageTree internal messageTreeTemplate;

  Jubjub public currentJubjub;

  /// -----------------------------------------------------------------------
  /// Constructor
  /// -----------------------------------------------------------------------

  constructor() payable {
    jubjubTemplate = new Jubjub();
    stateTreeTemplate = new StateTree(STATE_TREE_SUBDEPTH);
    messageTreeTemplate = new MessageTree(MESSAGE_TREE_SUBDEPTH);
    emptyBallotRoots[0] = uint256(4904028317433377177773123885584230878115556059208431880161186712332781831975);
    emptyBallotRoots[1] = uint256(344732312350052944041104345325295111408747975338908491763817872057138864163);
    emptyBallotRoots[2] = uint256(19445814455012978799483892811950396383084183210860279923207176682490489907069);
    emptyBallotRoots[3] = uint256(10621810780690303482827422143389858049829670222244900617652404672125492013328);
    emptyBallotRoots[4] = uint256(17077690379337026179438044602068085690662043464643511544329656140997390498741);
  }

  /// -----------------------------------------------------------------------
  /// Deployment Logic
  /// -----------------------------------------------------------------------

  function determineJubjub(bytes32 salt) public view virtual returns (address) {
    return address(jubjubTemplate).predictDeterministicAddress(abi.encodePacked(), salt, address(this));
  }

  function deployJubjub(
    bytes32 salt, // create2 salt.
    ISignUpGatekeeper _signUpGatekeeper,
    IInitialVoiceCreditProxy _voiceCreditProxy
  ) public payable virtual {
    Jubjub jubjub = Jubjub(
      address(jubjubTemplate).cloneDeterministic(
        abi.encodePacked(), // we dont have constructor args
        salt
      )
    );

    uint256[] memory _emptyBallotRoots = new uint256[](5);
    _emptyBallotRoots[0] = emptyBallotRoots[0];
    _emptyBallotRoots[1] = emptyBallotRoots[1];
    _emptyBallotRoots[2] = emptyBallotRoots[2];
    _emptyBallotRoots[3] = emptyBallotRoots[3];
    _emptyBallotRoots[4] = emptyBallotRoots[4];

    AccQueue _stateAq = deployStateTree(salt);
    AccQueue _messageAq = deployMessageTree(salt);
    _stateAq.transferOwnership(address(jubjub));
    _messageAq.transferOwnership(address(jubjub));

    require(_stateAq.owner() != address(0), "stateTree owner must be set");
    require(_messageAq.owner() != address(0), "msgTree owner must be set");

    // _stateAq.transferOwnership(address(jubjub));
    // _messageAq.transferOwnership(address(jubjub));

    jubjub.initialize(6, 8, 3, 3, _emptyBallotRoots, _signUpGatekeeper, _voiceCreditProxy, _stateAq, _messageAq);
    jubjub.setVkRegistry(VkRegistry(address(this)));

    uint256 processVkSig = genProcessVkSig(6, 8, 3, 3);
    VerifyingKey storage processVk = processVks[processVkSig];
    processVk.alpha1 = Pairing.G1Point(uint256(0), uint256(1));
    processVk.beta2 = Pairing.G2Point([uint256(2), uint256(3)], [uint256(4), uint256(5)]);
    processVk.gamma2 = Pairing.G2Point([uint256(6), uint256(7)], [uint256(8), uint256(9)]);
    processVk.delta2 = Pairing.G2Point([uint256(10), uint256(11)], [uint256(12), uint256(13)]);
    processVk.ic.push(Pairing.G1Point(uint256(14), uint256(15)));
    processVk.ic.push(Pairing.G1Point(uint256(16), uint256(17)));

    uint256 tallyVkSig = genTallyVkSig(6, 3, 3);
    VerifyingKey storage tallyVk = tallyVks[tallyVkSig];
    processVk.alpha1 = Pairing.G1Point(uint256(0), uint256(1));
    processVk.beta2 = Pairing.G2Point([uint256(2), uint256(3)], [uint256(4), uint256(5)]);
    processVk.gamma2 = Pairing.G2Point([uint256(6), uint256(7)], [uint256(8), uint256(9)]);
    processVk.delta2 = Pairing.G2Point([uint256(10), uint256(11)], [uint256(12), uint256(13)]);
    processVk.ic.push(Pairing.G1Point(uint256(14), uint256(15)));
    processVk.ic.push(Pairing.G1Point(uint256(16), uint256(17)));

    setVerifyingKeys(6, 3, 8, 3, 3, processVk, tallyVk);
    jubjub.transferOwnership(msg.sender);



    currentJubjub = jubjub;
    emit JubjubDeployed(jubjub);
  }

  function deployStateTree(
    bytes32 salt // create2 salt.
  ) public payable virtual returns (AccQueue) {
    StateTree stateTree = StateTree(
      address(stateTreeTemplate).cloneDeterministic(
        abi.encodePacked(salt, STATE_TREE_SUBDEPTH), // we dont have constructor args
        salt
      )
    );
    stateTree.initialize();
    emit StateTreeDeployed(stateTree);
    return stateTree;
  }

  function deployMessageTree(
    bytes32 salt // create2 salt.
  ) public payable virtual returns (AccQueue) {
    MessageTree messageTree = MessageTree(
      address(messageTreeTemplate).cloneDeterministic(
        abi.encodePacked(salt, MESSAGE_TREE_SUBDEPTH), // we dont have constructor args
        salt
      )
    );
    messageTree.initialize();
    emit MessageTreeDeployed(messageTree);
    return messageTree;
  }
}
