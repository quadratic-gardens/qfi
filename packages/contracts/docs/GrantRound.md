# Grant Round Contract
This contract manages contributions, withdrawals, Voting and the distribution of funds for a particular grant round.

## Functions
### constructor
```solidity
  function constructor(
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
|`_duration` | uint256 | uint256, the duration of the GrantRound
|`_maxValues` | struct Params.MaxValues | MaxValues stored in memory, the maxMessages and maxVoteOptions of the GrantRound as uint256 values
|`_treeDepths` | struct Params.TreeDepths | TreeDepths stored in memory, intStateTreeDepth, messageTreeSubDepth, messageTreeDepth, and voteOptionTreeDepth as uint8 values
|`_batchSizes` | struct Params.BatchSizes | BatchSizes stored in memory, this inlcudes the message batch size and the tally batch size
|`_coordinatorPubKey` | struct IPubKey.PubKey | PubKey stored in memory, MACI pubkey of the coordinator of the GrantRounds
|`_extContracts` | struct PollDeploymentParams.ExtContracts | ExtContracts stored in memory, this includes the maci, and messageAq contracts that will be used to tally the Poll.

