# Grant Round Factory Contract
Deploys new Quadratic Funding Round Contracts

## Functions
### setMessageAqFactory
```solidity
  function setMessageAqFactory(
    contract MessageAqFactory _messageAqFactory
  ) public
```
Sets the MessageAqFactory to use for the grant round

public function, _messageAqFactory should deploy new AccQueueQuinaryMaci AccQueue(s), need to set before calling deployGrantRound

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_messageAqFactory` | contract MessageAqFactory | MessageAqFactory stored in memory

### deployGrantRound
```solidity
  function deployGrantRound(
    uint256 _duration,
    struct Params.MaxValues _maxValues,
    struct Params.TreeDepths _treeDepths,
    struct Params.BatchSizes _batchSizes,
    struct IPubKey.PubKey _coordinatorPubKey,
    contract VkRegistry _maci,
    contract IMACI _grantRoundOwner
  ) public returns (contract GrantRound)
```
Deploys a new GrantRound Contract

public function

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_duration` | uint256 | uint256  stored in memory, the duration of the GrantRound
|`_maxValues` | struct Params.MaxValues | MaxValues stored in memory, the maxMessages and maxVoteOptions of the GrantRound as uint256 values
|`_treeDepths` | struct Params.TreeDepths | TreeDepths stored in memory, intStateTreeDepth, messageTreeSubDepth, messageTreeDepth, and voteOptionTreeDepth as uint8 values
|`_batchSizes` | struct Params.BatchSizes | BatchSizes stored in memory, messageBatchSize and tallyBatchSize as uint8 values
|`_coordinatorPubKey` | struct IPubKey.PubKey | PubKey stored in memory, MACI pubkey of the coordinator of the GrantRound
|`_maci` | contract VkRegistry | VkRegistry
|`_grantRoundOwner` | contract IMACI | address stored in memory

