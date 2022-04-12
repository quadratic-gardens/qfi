# 🖇 QFI Hooks

React hooks to send transactions for the QFI contract using Ethers.js
<br><br><br><br>

# useAcceptContributionsAndTopUpsBeforeNewRound
<br>
Hook for sending AcceptContributionsAndTopUpsBeforeNewRound transactions for the QFI contract.
<br><br>

```js
import { useAcceptContributionsAndTopUpsBeforeNewRound } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useAcceptContributionsAndTopUpsBeforeNewRound } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleAcceptContributionsAndTopUpsBeforeNewRound ] = useAcceptContributionsAndTopUpsBeforeNewRound(contractAddress)

  const [ok, e1] = await handleAcceptContributionsAndTopUpsBeforeNewRound.validator()
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleAcceptContributionsAndTopUpsBeforeNewRound.send()
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleAcceptContributionsAndTopUpsBeforeNewRound.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleAcceptContributionsAndTopUpsBeforeNewRound` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the AcceptContributionsAndTopUpsBeforeNewRound transaction|

# useAddFundingSource
<br>
Hook for sending AddFundingSource transactions for the QFI contract.
<br><br>

```js
import { useAddFundingSource } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useAddFundingSource } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleAddFundingSource ] = useAddFundingSource(contractAddress)

  const [ok, e1] = await handleAddFundingSource.validator(_source)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleAddFundingSource.send(_source)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleAddFundingSource.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_source` | <pre>{<br>     address<br>}</pre>  | The _source param as address value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleAddFundingSource` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the AddFundingSource transaction|

# useCloseVotingAndWaitForDeadline
<br>
Hook for sending CloseVotingAndWaitForDeadline transactions for the QFI contract.
<br><br>

```js
import { useCloseVotingAndWaitForDeadline } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useCloseVotingAndWaitForDeadline } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleCloseVotingAndWaitForDeadline ] = useCloseVotingAndWaitForDeadline(contractAddress)

  const [ok, e1] = await handleCloseVotingAndWaitForDeadline.validator()
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleCloseVotingAndWaitForDeadline.send()
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleCloseVotingAndWaitForDeadline.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleCloseVotingAndWaitForDeadline` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the CloseVotingAndWaitForDeadline transaction|

# useContribute
<br>
Hook for sending Contribute transactions for the QFI contract.
<br><br>

```js
import { useContribute } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useContribute } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleContribute ] = useContribute(contractAddress)

  const [ok, e1] = await handleContribute.validator(pubKey,amount)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleContribute.send(pubKey,amount)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleContribute.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`pubKey` | <pre>{<br>     x:uint256<br>     y:uint256<br>}</pre>  | The pubKey param as struct IPubKey.PubKey value|
|`amount` | <pre>{<br>     uint256<br>}</pre>  | The amount param as uint256 value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleContribute` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the Contribute transaction|

# useDeployGrantRound
<br>
Hook for sending DeployGrantRound transactions for the QFI contract.
<br><br>

```js
import { useDeployGrantRound } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useDeployGrantRound } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleDeployGrantRound ] = useDeployGrantRound(contractAddress)

  const [ok, e1] = await handleDeployGrantRound.validator(_duration,_maxValues,_treeDepths,_coordinatorPubKey,coordinator)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleDeployGrantRound.send(_duration,_maxValues,_treeDepths,_coordinatorPubKey,coordinator)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleDeployGrantRound.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_duration` | <pre>{<br>     uint256<br>}</pre>  | The _duration param as uint256 value|
|`_maxValues` | <pre>{<br>     maxMessages:uint256<br>     maxVoteOptions:uint256<br>}</pre>  | The _maxValues param as struct Params.MaxValues value|
|`_treeDepths` | <pre>{<br>     intStateTreeDepth:uint8<br>     messageTreeSubDepth:uint8<br>     messageTreeDepth:uint8<br>     voteOptionTreeDepth:uint8<br>}</pre>  | The _treeDepths param as struct Params.TreeDepths value|
|`_coordinatorPubKey` | <pre>{<br>     x:uint256<br>     y:uint256<br>}</pre>  | The _coordinatorPubKey param as struct IPubKey.PubKey value|
|`coordinator` | <pre>{<br>     address<br>}</pre>  | The coordinator param as address value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleDeployGrantRound` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the DeployGrantRound transaction|

# useDeployPoll
<br>
Hook for sending DeployPoll transactions for the QFI contract.
<br><br>

```js
import { useDeployPoll } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useDeployPoll } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleDeployPoll ] = useDeployPoll(contractAddress)

  const [ok, e1] = await handleDeployPoll.validator(_duration,_maxValues,_treeDepths,_coordinatorPubKey)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleDeployPoll.send(_duration,_maxValues,_treeDepths,_coordinatorPubKey)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleDeployPoll.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_duration` | <pre>{<br>     uint256<br>}</pre>  | The _duration param as uint256 value|
|`_maxValues` | <pre>{<br>     maxMessages:uint256<br>     maxVoteOptions:uint256<br>}</pre>  | The _maxValues param as struct Params.MaxValues value|
|`_treeDepths` | <pre>{<br>     intStateTreeDepth:uint8<br>     messageTreeSubDepth:uint8<br>     messageTreeDepth:uint8<br>     voteOptionTreeDepth:uint8<br>}</pre>  | The _treeDepths param as struct Params.TreeDepths value|
|`_coordinatorPubKey` | <pre>{<br>     x:uint256<br>     y:uint256<br>}</pre>  | The _coordinatorPubKey param as struct IPubKey.PubKey value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleDeployPoll` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the DeployPoll transaction|

# useFinalizeCurrentRound
<br>
Hook for sending FinalizeCurrentRound transactions for the QFI contract.
<br><br>

```js
import { useFinalizeCurrentRound } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useFinalizeCurrentRound } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleFinalizeCurrentRound ] = useFinalizeCurrentRound(contractAddress)

  const [ok, e1] = await handleFinalizeCurrentRound.validator(_totalSpent,_totalSpentSalt)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleFinalizeCurrentRound.send(_totalSpent,_totalSpentSalt)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleFinalizeCurrentRound.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_totalSpent` | <pre>{<br>     uint256<br>}</pre>  | The _totalSpent param as uint256 value|
|`_totalSpentSalt` | <pre>{<br>     uint256<br>}</pre>  | The _totalSpentSalt param as uint256 value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleFinalizeCurrentRound` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the FinalizeCurrentRound transaction|

# useInit
<br>
Hook for sending Init transactions for the QFI contract.
<br><br>

```js
import { useInit } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useInit } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleInit ] = useInit(contractAddress)

  const [ok, e1] = await handleInit.validator(_vkRegistry,_messageAqFactory)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleInit.send(_vkRegistry,_messageAqFactory)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleInit.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_vkRegistry` | <pre>{<br>     address<br>}</pre>  | The _vkRegistry param as contract VkRegistry value|
|`_messageAqFactory` | <pre>{<br>     address<br>}</pre>  | The _messageAqFactory param as contract MessageAqFactory value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleInit` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the Init transaction|

# useInitialize
<br>
Hook for sending Initialize transactions for the QFI contract.
<br><br>

```js
import { useInitialize } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useInitialize } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleInitialize ] = useInitialize(contractAddress)

  const [ok, e1] = await handleInitialize.validator(_vkRegistry,_messageAqFactoryPolls,_messageAqFactoryGrantRounds)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleInitialize.send(_vkRegistry,_messageAqFactoryPolls,_messageAqFactoryGrantRounds)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleInitialize.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_vkRegistry` | <pre>{<br>     address<br>}</pre>  | The _vkRegistry param as contract VkRegistry value|
|`_messageAqFactoryPolls` | <pre>{<br>     address<br>}</pre>  | The _messageAqFactoryPolls param as contract MessageAqFactory value|
|`_messageAqFactoryGrantRounds` | <pre>{<br>     address<br>}</pre>  | The _messageAqFactoryGrantRounds param as contract MessageAqFactory value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleInitialize` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the Initialize transaction|

# useMergeStateAq
<br>
Hook for sending MergeStateAq transactions for the QFI contract.
<br><br>

```js
import { useMergeStateAq } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useMergeStateAq } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleMergeStateAq ] = useMergeStateAq(contractAddress)

  const [ok, e1] = await handleMergeStateAq.validator(_pollId)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleMergeStateAq.send(_pollId)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleMergeStateAq.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_pollId` | <pre>{<br>     uint256<br>}</pre>  | The _pollId param as uint256 value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleMergeStateAq` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the MergeStateAq transaction|

# useMergeStateAqSubRoots
<br>
Hook for sending MergeStateAqSubRoots transactions for the QFI contract.
<br><br>

```js
import { useMergeStateAqSubRoots } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useMergeStateAqSubRoots } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleMergeStateAqSubRoots ] = useMergeStateAqSubRoots(contractAddress)

  const [ok, e1] = await handleMergeStateAqSubRoots.validator(_numSrQueueOps,_pollId)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleMergeStateAqSubRoots.send(_numSrQueueOps,_pollId)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleMergeStateAqSubRoots.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_numSrQueueOps` | <pre>{<br>     uint256<br>}</pre>  | The _numSrQueueOps param as uint256 value|
|`_pollId` | <pre>{<br>     uint256<br>}</pre>  | The _pollId param as uint256 value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleMergeStateAqSubRoots` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the MergeStateAqSubRoots transaction|

# useRemoveFundingSource
<br>
Hook for sending RemoveFundingSource transactions for the QFI contract.
<br><br>

```js
import { useRemoveFundingSource } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useRemoveFundingSource } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleRemoveFundingSource ] = useRemoveFundingSource(contractAddress)

  const [ok, e1] = await handleRemoveFundingSource.validator(_source)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleRemoveFundingSource.send(_source)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleRemoveFundingSource.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_source` | <pre>{<br>     address<br>}</pre>  | The _source param as address value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleRemoveFundingSource` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the RemoveFundingSource transaction|

# useRenounceOwnership
<br>
Hook for sending RenounceOwnership transactions for the QFI contract.
<br><br>

```js
import { useRenounceOwnership } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useRenounceOwnership } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleRenounceOwnership ] = useRenounceOwnership(contractAddress)

  const [ok, e1] = await handleRenounceOwnership.validator()
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleRenounceOwnership.send()
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleRenounceOwnership.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleRenounceOwnership` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the RenounceOwnership transaction|

# useSetPollProcessorAndTallyer
<br>
Hook for sending SetPollProcessorAndTallyer transactions for the QFI contract.
<br><br>

```js
import { useSetPollProcessorAndTallyer } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useSetPollProcessorAndTallyer } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleSetPollProcessorAndTallyer ] = useSetPollProcessorAndTallyer(contractAddress)

  const [ok, e1] = await handleSetPollProcessorAndTallyer.validator(_pollProcessorAndTallyer)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleSetPollProcessorAndTallyer.send(_pollProcessorAndTallyer)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleSetPollProcessorAndTallyer.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_pollProcessorAndTallyer` | <pre>{<br>     address<br>}</pre>  | The _pollProcessorAndTallyer param as contract PollProcessorAndTallyer value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleSetPollProcessorAndTallyer` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the SetPollProcessorAndTallyer transaction|

# useSignUp
<br>
Hook for sending SignUp transactions for the QFI contract.
<br><br>

```js
import { useSignUp } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useSignUp } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleSignUp ] = useSignUp(contractAddress)

  const [ok, e1] = await handleSignUp.validator(_pubKey,_signUpGatekeeperData,_initialVoiceCreditProxyData)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleSignUp.send(_pubKey,_signUpGatekeeperData,_initialVoiceCreditProxyData)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleSignUp.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_pubKey` | <pre>{<br>     x:uint256<br>     y:uint256<br>}</pre>  | The _pubKey param as struct IPubKey.PubKey value|
|`_signUpGatekeeperData` | <pre>{<br>     bytes<br>}</pre>  | The _signUpGatekeeperData param as bytes value|
|`_initialVoiceCreditProxyData` | <pre>{<br>     bytes<br>}</pre>  | The _initialVoiceCreditProxyData param as bytes value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleSignUp` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the SignUp transaction|

# useTransferOwnership
<br>
Hook for sending TransferOwnership transactions for the QFI contract.
<br><br>

```js
import { useTransferOwnership } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useTransferOwnership } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleTransferOwnership ] = useTransferOwnership(contractAddress)

  const [ok, e1] = await handleTransferOwnership.validator(newOwner)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleTransferOwnership.send(newOwner)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleTransferOwnership.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`newOwner` | <pre>{<br>     address<br>}</pre>  | The newOwner param as address value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleTransferOwnership` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the TransferOwnership transaction|

# useWithdrawContribution
<br>
Hook for sending WithdrawContribution transactions for the QFI contract.
<br><br>

```js
import { useWithdrawContribution } from "@qfi/hooks/QFI";
```
<br>

### **Usage**
<br>

```js
import { useWithdrawContribution } from "@qfi/hooks/QFI";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleWithdrawContribution ] = useWithdrawContribution(contractAddress)

  const [ok, e1] = await handleWithdrawContribution.validator()
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleWithdrawContribution.send()
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleWithdrawContribution.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleWithdrawContribution` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the WithdrawContribution transaction|

