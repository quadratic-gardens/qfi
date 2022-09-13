# GrantRound

This contract manages contributions, withdrawals, Voting and the distribution of funds for a particular grant round.

Inherits from Poll Contract and uses the Poll Contract interface to manage the voting.

## Functions
### constructor
```solidity
  function constructor(
    uint256 _voiceCreditFactor,
    address _coordinator,
    contract ERC20 _nativeToken,
    uint256 _duration,
    struct Params.MaxValues _maxValues,
    struct Params.TreeDepths _treeDepths,
    struct Params.BatchSizes _batchSizes,
    struct IPubKey.PubKey _coordinatorPubKey,
    struct PollDeploymentParams.ExtContracts _extContracts
  ) public
```
Constructor for the GrantRound, special type of poll that implements Quadratic Funding.

Binds the contracts that will be used to tally the Poll and sets duration ans coordinator.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_voiceCreditFactor` | uint256 | uint256 The factor by which the voiceCredit is multiplied to determine the amount of voice credits that are distributed to the contributor.
|`_coordinator` | address | The address of the coordinator of the GrantRound.
|`_nativeToken` | contract ERC20 | The address of the ERC20 token used for the GrantRound.
|`_duration` | uint256 | uint256, the duration of the GrantRound
|`_maxValues` | struct Params.MaxValues | MaxValues stored in memory, the maxMessages and maxVoteOptions of the GrantRound as uint256 values
|`_treeDepths` | struct Params.TreeDepths | TreeDepths stored in memory, intStateTreeDepth, messageTreeSubDepth, messageTreeDepth, and voteOptionTreeDepth as uint8 values
|`_batchSizes` | struct Params.BatchSizes | BatchSizes stored in memory, this inlcudes the message batch size and the tally batch size
|`_coordinatorPubKey` | struct IPubKey.PubKey | PubKey stored in memory, MACI pubkey of the coordinator of the GrantRounds
|`_extContracts` | struct PollDeploymentParams.ExtContracts | ExtContracts stored in memory, this includes the maci, and messageAq contracts that will be used to tally the Poll.

### publishMessageBatch
```solidity
  function publishMessageBatch(
    struct IMessage.Message[] _messages,
    struct IPubKey.PubKey[] _encPubKeys
  ) external
```
Allows anyone to publish a batch of messages (an encrypted command and signature).

This function also enqueues the messages.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_messages` | struct IMessage.Message[] | Message[] The messages to publish as an array of Message structs.
|`_encPubKeys` | struct IPubKey.PubKey[] | PubKey[] An array of epheremal public keys which can be combined with the
    coordinator's private key to generate an ECDH shared key with which
    to encrypt the message.

### publishTallyHash
```solidity
  function publishTallyHash(
    string _tallyHash
  ) external
```

Publish the IPFS hash of the vote tally. Only coordinator can publish.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_tallyHash` | string | IPFS hash of the vote tally.

### finalize
```solidity
  function finalize(
  ) external
```


### cancel
```solidity
  function cancel(
  ) external
```

Cancel a funding round.


### getAllocatedAmount
```solidity
  function getAllocatedAmount(
    uint256 _tallyResult,
    uint256 _spent
  ) public returns (uint256)
```

Get allocated token amount (without verification).

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_tallyResult` | uint256 | The result of vote tally for the recipient.
|`_spent` | uint256 | The amount of voice credits spent on the recipient.

### claimFunds
```solidity
  function claimFunds(
  ) external
```

### transferMatchingFunds
```solidity
  function transferMatchingFunds(
  ) external
```

## Events
### Voted
```solidity
  event Voted(
    address _voter
  )
```
Event issued when a registered user posts a (batch of) message(s) to vote.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_voter`| address | The address of the person who published a (batch of) message(s).
### TallyPublished
```solidity
  event TallyPublished(
    string _tallyHash
  )
```
Event issued when the coordinator publishes the IPFS hash for the vote tally.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_tallyHash`| string | The IPFS hash of the vote tally.
### GrantRoundCancelled
```solidity
  event GrantRoundCancelled(
    bool _isFinalized,
    bool _isCancelled
  )
```
Event issued when the owner (deployer) cancel the Grant Round.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_isFinalized`| bool | True when the Grant Round is finalized, otherwise false.
|`_isCancelled`| bool | True when the Grant Round is cancelled, otherwise false.
### FundsClaimed
```solidity
  event FundsClaimed(
    address _recipient,
    uint256 _voteOptionIndex,
    uint256 _allocatedAmount
  )
```
Event issued when the beneficiary (recipient) claims the corresponding Grant Round funds.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_recipient`| address | The address of the recipient.
|`_voteOptionIndex`| uint256 | The index of the voting option associated with the recipient.
|`_allocatedAmount`| uint256 | The amount to be claimed.
