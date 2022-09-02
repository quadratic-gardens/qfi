Top level contract for the Quadratic Funding Infrastructure

Special type of MACI that allows for a quadratic funding scheme.

## Functions
### constructor
```solidity
  function constructor(
    contract ERC20 _nativeToken,
    contract GrantRoundFactory _grantRoundFactory,
    contract PollFactory _pollFactory,
    contract SignUpGatekeeper _signUpGatekeeper,
    contract InitialVoiceCreditProxy _initialVoiceCreditProxy
  ) public
```
Constructor for the Quadratic Funding Infrastructure

Binds the contracts that are needed for the Quadratic Funding Infrastructure

Please exercise caution when choosing the `_nativeToken` as this cannot be changed afterwards.  Choosing a token that charges fees on transfers will cause the contracts to revert. 
Also, please consider that certain tokens such as USDC/USDT have the ability to blacklist addresses, therefore using these tokens might result in funds being stuck. 

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_nativeToken` | contract ERC20 | ERC20, the token that will be used in all of the contracts for funding
|`_grantRoundFactory` | contract GrantRoundFactory | GrantRoundFactory, the contract that will be used to create GrantRounds which are a special type of Poll
|`_pollFactory` | contract PollFactory | PollFactory, the contract that will be used to create Polls
|`_signUpGatekeeper` | contract SignUpGatekeeper | SignUpGatekeeper, the contract that will be used to limit who can sign up to MACI
|`_initialVoiceCreditProxy` | contract InitialVoiceCreditProxy | InitialVoiceCreditProxy, the contract that will be used to set the initial voice credit balance for a user

### initialize
```solidity
  function initialize(
    contract VkRegistry _vkRegistry,
    contract MessageAqFactory _messageAqFactoryPolls,
    contract MessageAqFactory _messageAqFactoryGrantRounds
  ) public
```
Initializer function for the Quadratic Funding Infrastructure

Initialise the various factory/helper contracts. This should only be run
once and it must be run before deploying the first Poll.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_vkRegistry` | contract VkRegistry | VkRegistry, the contract that stores verifying keys for the circuits
|`_messageAqFactoryPolls` | contract MessageAqFactory | MessageAqFactory, the contract that will be used to deploy a new AccQueueQuinaryMaci contract for the Poll
|`_messageAqFactoryGrantRounds` | contract MessageAqFactory | MessageAqFactory, the contract that will be used to deploy a new AccQueueQuinaryMaci contract for the GrantRounds

### setPollProcessorAndTallyer
```solidity
  function setPollProcessorAndTallyer(
    contract PollProcessorAndTallyer _pollProcessorAndTallyer
  ) public
```
Sets the PollProcessorAndTallyer to use for the grant round

public function,

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_pollProcessorAndTallyer` | contract PollProcessorAndTallyer | PollProcessorAndTallyer stored in memory

### contribute
```solidity
  function contribute(
    struct IPubKey.PubKey pubKey,
    uint256 amount
  ) external
```
Contribute tokens to this funding round.

public function, allows a user to contribute to this funding round by sending tokens in exchange for voice credits.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`pubKey` | struct IPubKey.PubKey | Contributor's public key.
|`amount` | uint256 | Contribution amount.

### getVoiceCredits
```solidity
  function getVoiceCredits(
    address _data
  ) public returns (uint256)
```

Get the amount of voice credits for a given address.
This function is a part of the InitialVoiceCreditProxy interface.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_data` | address | Encoded address of a user.

### withdrawContribution
```solidity
  function withdrawContribution(
  ) external
```

Withdraw contributed funds from the pool if the round has been cancelled.


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
|`_duration` | uint256 | uint256 stored in memory, the duration of the GrantRound
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
### getVotingDeadline
```solidity
  function getVotingDeadline(
    uint256 grantRound
  ) public returns (uint256)
```
Calculate the voting deadline for a grant round.

public view function

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`grantRound` | uint256 | uint256 grantRoundId of the GrantRound to use

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint256`| uint256 | the voting deadline for the current grant round
### closeVotingAndWaitForDeadline
```solidity
  function closeVotingAndWaitForDeadline(
  ) public
```




### finalizeCurrentRound
```solidity
  function finalizeCurrentRound(
    uint256 _finalTallyCommitment,
    uint256 _finalTallyCommitment,
    uint256 _alphaDenominator
  ) external
```
Finalizes the current round and transfers the matching funds

Function that finalizes the current round by calling `finalize` and transfers matching funds with FundsManager

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_finalTallyCommitment` | uint256 | uint256, the tally commitment
|`_finalTallyCommitment` | uint256 | uint256, the subsidy commitment
|`_alphaDenominator` | uint256 | uint256, the denominator for calculations

### acceptContributionsAndTopUpsBeforeNewRound
```solidity
  function acceptContributionsAndTopUpsBeforeNewRound(
  ) public
```

Resets the state so that a new round can be deployed


## Events
### QfiDeployed
```solidity
  event QfiDeployed(
    address _grantRoundFactory,
    address _nativeToken,
    uint256 _voiceCreditFactor,
    enum QFI.Stage _currentStage
  )
```
Event issued when the QFI contract is deployed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_grantRoundFactory`| address | The Ethereum smart contract address of the current Grant Round Factory.
|`_nativeToken`| address | The Ethereum smart contract address of the ERC20 Token used for the current Grant Round.
|`_voiceCreditFactor`| uint256 | Constant used to handle VCs / Tokens conversions (e.g., reconstruct the exact contribution amount in Token from VCs).
|`_currentStage`| enum QFI.Stage | The updated value for the current QFI stage.
### QfiInitialized
```solidity
  event QfiInitialized(
    address _messageAqFactoryGrantRounds,
    enum QFI.Stage _currentStage
  )
```
Event issued when the owner (deployer) initialize the QFI contract.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_messageAqFactoryGrantRounds`| address | The Ethereum smart contract address of the Message AQ Factory for the current Grant Round.
|`_currentStage`| enum QFI.Stage | The updated value for the current QFI stage.
### PollProcessorAndTallyerChanged
```solidity
  event PollProcessorAndTallyerChanged(
    address _pollProcessorAndTallyer
  )
```
Event issued when the owner (deployer) set the PollProcessorAndTallyer contract.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_pollProcessorAndTallyer`| address | The Ethereum smart contract address of the PollProcessorAndTallyer contract for the current Grant Round.
### ContributionSent
```solidity
  event ContributionSent(
    address _contributor,
    uint256 _amount
  )
```
Event issued when an unregistered user signs up and contributes to the current Grant Round.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_contributor`| address | The Ethereum address of who sends the contribution.
|`_amount`| uint256 | The amount in native ERC20 tokens submitted as contribution.
### ContributionWithdrew
```solidity
  event ContributionWithdrew(
    address _contributor
  )
```
Event issued when a contributor decides to withdraw his/her contribution for the current Grant Round.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_contributor`| address | The Ethereum address of who withdraws the contribution.
### GrantRoundDeployed
```solidity
  event GrantRoundDeployed(
    address _currentGrantRound,
    uint256 _duration,
    struct Params.MaxValues _maxValues,
    struct Params.TreeDepths _treeDepths,
    struct Params.BatchSizes _batchSizes,
    struct IPubKey.PubKey _coordinatorPubKey,
    enum QFI.Stage _currentStage
  )
```
Event issued when the owner (deployer) deploy a new Grant Round.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_currentGrantRound`| address | The Ethereum smart contract address of the current Grant Round.
|`_duration`| uint256 | The duration of the current Grant Round.
|`_maxValues`| struct Params.MaxValues | The maximum amount of messages and vote options of the current Grant Round.
|`_treeDepths`| struct Params.TreeDepths | The intStateTreeDepth, messageTreeSubDepth, messageTreeDepth, and voteOptionTreeDepth.
|`_batchSizes`| struct Params.BatchSizes | The message and vote tally batch sizes.
|`_coordinatorPubKey`| struct IPubKey.PubKey | The MACI public key of the coordinator of the current Grant Round.
|`_currentStage`| enum QFI.Stage | The updated value for the current QFI stage.
### VotingPeriodClosed
```solidity
  event VotingPeriodClosed(
    enum QFI.Stage _currentStage
  )
```
Event issued when the owner (deployer) decides to close the voting period for the current Grant Round.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_currentStage`| enum QFI.Stage | The updated value for the current QFI stage.
### PreRoundContributionPeriodStarted
```solidity
  event PreRoundContributionPeriodStarted(
    enum QFI.Stage _currentStage
  )
```
Event issued when the owner (deployer) decides to start accepting contribution/signup period for the next Grant Round.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_currentStage`| enum QFI.Stage | The updated value for the current QFI stage.
### GrantRoundFinalized
```solidity
  event GrantRoundFinalized(
    address _currentGrantRound,
    enum QFI.Stage _currentStage
  )
```
Event issued when the owner finalizes the current Grant Round.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`_currentGrantRound`| address | The Ethereum smart contract address of the current Grant Round.
|`_currentStage`| enum QFI.Stage | The updated value for the current QFI stage.
