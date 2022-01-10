# Quadratic Funding Infrastructure
Top level contract for the Quadratic Funding Infrastructure

## Functions
### constructor
```solidity
  function constructor(
    contract GrantRoundFactory _grantRoundFactory,
    contract PollFactory _pollFactory,
    contract SignUpGatekeeper _signUpGatekeeper,
    contract InitialVoiceCreditProxy _initialVoiceCreditProxy
  ) public
```
Constructor for the Quadratic Funding Infrastructure

Binds the contracts that are needed for the Quadratic Funding Infrastructure

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_grantRoundFactory` | contract GrantRoundFactory | GrantRoundFactory, the contract that will be used to create GrantRounds which are a special type of Poll
|`_pollFactory` | contract PollFactory | PollFactory, the contract that will be used to create Polls
|`_signUpGatekeeper` | contract SignUpGatekeeper | SignUpGatekeeper, the contract that will be used to limit who can sign up to MACI
|`_initialVoiceCreditProxy` | contract InitialVoiceCreditProxy | InitialVoiceCreditProxy, the contract that will be used to set the initial voice credit balance for a user

### deployGrantRound
```solidity
  function deployGrantRound(
    uint256 _duration,
    struct Params.MaxValues _maxValues,
    struct Params.TreeDepths _treeDepths,
    struct IPubKey.PubKey _coordinatorPubKey
  ) public
```
Deploys a new grant round.

Deploys a special kind of Poll called a GrantRound.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_duration` | uint256 | uint256  stored in memory, the duration of the GrantRound
|`_maxValues` | struct Params.MaxValues | MaxValues stored in memory, the maxMessages and maxVoteOptions of the GrantRound as uint256 values
|`_treeDepths` | struct Params.TreeDepths | TreeDepths stored in memory, intStateTreeDepth, messageTreeSubDepth, messageTreeDepth, and voteOptionTreeDepth as uint8 values
|`_coordinatorPubKey` | struct IPubKey.PubKey | PubKey stored in memory, MACI pubkey of the coordinator of the GrantRounds

### getGrantRound
```solidity
  function getGrantRound(
    uint256 _grantRoundId
  ) public returns (contract GrantRound)
```
Retrieves the grant round contract given its ID.

public view function, returns the Poll address given its grantRoundId.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_grantRoundId` | uint256 | uint256 grantRoundId of the GrantRound to retrieve

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`returns`| uint256 | the GrantRound contract
