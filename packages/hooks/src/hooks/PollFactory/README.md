# 🖇 PollFactory Hooks

React hooks to send transactions for the PollFactory contract using Ethers.js
<br><br><br><br>

# useDeploy
<br>
Hook for sending Deploy transactions for the PollFactory contract.
<br><br>

```js
import { useDeploy } from "@qfi/hooks/PollFactory";
```
<br>

### **Usage**
<br>

```js
import { useDeploy } from "@qfi/hooks/PollFactory";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleDeploy ] = useDeploy(contractAddress)

  const [ok, e1] = await handleDeploy.validator(_duration,_maxValues,_treeDepths,_batchSizes,_coordinatorPubKey,_vkRegistry,_maci,_pollOwner)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleDeploy.send(_duration,_maxValues,_treeDepths,_batchSizes,_coordinatorPubKey,_vkRegistry,_maci,_pollOwner)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleDeploy.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_duration` | <pre>{<br>     uint256<br>}</pre>  | The _duration param as uint256 value|
|`_maxValues` | <pre>{<br>     maxMessages:uint256DELIMITERmaxVoteOptions:uint256<br>}</pre>  | The _maxValues param as struct Params.MaxValues value|
|`_treeDepths` | <pre>{<br>     intStateTreeDepth:uint8DELIMITERmessageTreeSubDepth:uint8DELIMITERmessageTreeDepth:uint8DELIMITERvoteOptionTreeDepth:uint8<br>}</pre>  | The _treeDepths param as struct Params.TreeDepths value|
|`_batchSizes` | <pre>{<br>     messageBatchSize:uint8DELIMITERtallyBatchSize:uint8<br>}</pre>  | The _batchSizes param as struct Params.BatchSizes value|
|`_coordinatorPubKey` | <pre>{<br>     x:uint256DELIMITERy:uint256<br>}</pre>  | The _coordinatorPubKey param as struct IPubKey.PubKey value|
|`_vkRegistry` | <pre>{<br>     address<br>}</pre>  | The _vkRegistry param as contract VkRegistry value|
|`_maci` | <pre>{<br>     address<br>}</pre>  | The _maci param as contract IMACI value|
|`_pollOwner` | <pre>{<br>     address<br>}</pre>  | The _pollOwner param as address value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleDeploy` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the Deploy transaction|

# useRenounceOwnership
<br>
Hook for sending RenounceOwnership transactions for the PollFactory contract.
<br><br>

```js
import { useRenounceOwnership } from "@qfi/hooks/PollFactory";
```
<br>

### **Usage**
<br>

```js
import { useRenounceOwnership } from "@qfi/hooks/PollFactory";

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

# useSetMessageAqFactory
<br>
Hook for sending SetMessageAqFactory transactions for the PollFactory contract.
<br><br>

```js
import { useSetMessageAqFactory } from "@qfi/hooks/PollFactory";
```
<br>

### **Usage**
<br>

```js
import { useSetMessageAqFactory } from "@qfi/hooks/PollFactory";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleSetMessageAqFactory ] = useSetMessageAqFactory(contractAddress)

  const [ok, e1] = await handleSetMessageAqFactory.validator(_messageAqFactory)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleSetMessageAqFactory.send(_messageAqFactory)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleSetMessageAqFactory.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_messageAqFactory` | <pre>{<br>     address<br>}</pre>  | The _messageAqFactory param as contract MessageAqFactory value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleSetMessageAqFactory` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the SetMessageAqFactory transaction|

# useTransferOwnership
<br>
Hook for sending TransferOwnership transactions for the PollFactory contract.
<br><br>

```js
import { useTransferOwnership } from "@qfi/hooks/PollFactory";
```
<br>

### **Usage**
<br>

```js
import { useTransferOwnership } from "@qfi/hooks/PollFactory";

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

