# 🖇 Poll Hooks

React hooks to send transactions for the Poll contract using Ethers.js
<br><br><br><br>

# useBatchEnqueueMessage
<br>
Hook for sending BatchEnqueueMessage transactions for the Poll contract.
<br><br>

```js
import { useBatchEnqueueMessage } from "@qfi/hooks/Poll";
```
<br>

### **Usage**
<br>

```js
import { useBatchEnqueueMessage } from "@qfi/hooks/Poll";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleBatchEnqueueMessage ] = useBatchEnqueueMessage(contractAddress)

  const [ok, e1] = await handleBatchEnqueueMessage.validator(_messageSubRoot)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleBatchEnqueueMessage.send(_messageSubRoot)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleBatchEnqueueMessage.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_messageSubRoot` | <pre>{<br>     uint256<br>}</pre>  | The _messageSubRoot param as uint256 value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleBatchEnqueueMessage` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the BatchEnqueueMessage transaction|

# useMergeMaciStateAq
<br>
Hook for sending MergeMaciStateAq transactions for the Poll contract.
<br><br>

```js
import { useMergeMaciStateAq } from "@qfi/hooks/Poll";
```
<br>

### **Usage**
<br>

```js
import { useMergeMaciStateAq } from "@qfi/hooks/Poll";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleMergeMaciStateAq ] = useMergeMaciStateAq(contractAddress)

  const [ok, e1] = await handleMergeMaciStateAq.validator(_pollId)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleMergeMaciStateAq.send(_pollId)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleMergeMaciStateAq.getReceipt(tx.hash);
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
|`handleMergeMaciStateAq` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the MergeMaciStateAq transaction|

# useMergeMaciStateAqSubRoots
<br>
Hook for sending MergeMaciStateAqSubRoots transactions for the Poll contract.
<br><br>

```js
import { useMergeMaciStateAqSubRoots } from "@qfi/hooks/Poll";
```
<br>

### **Usage**
<br>

```js
import { useMergeMaciStateAqSubRoots } from "@qfi/hooks/Poll";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleMergeMaciStateAqSubRoots ] = useMergeMaciStateAqSubRoots(contractAddress)

  const [ok, e1] = await handleMergeMaciStateAqSubRoots.validator(_numSrQueueOps,_pollId)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleMergeMaciStateAqSubRoots.send(_numSrQueueOps,_pollId)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleMergeMaciStateAqSubRoots.getReceipt(tx.hash);
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
|`handleMergeMaciStateAqSubRoots` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the MergeMaciStateAqSubRoots transaction|

# useMergeMessageAq
<br>
Hook for sending MergeMessageAq transactions for the Poll contract.
<br><br>

```js
import { useMergeMessageAq } from "@qfi/hooks/Poll";
```
<br>

### **Usage**
<br>

```js
import { useMergeMessageAq } from "@qfi/hooks/Poll";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleMergeMessageAq ] = useMergeMessageAq(contractAddress)

  const [ok, e1] = await handleMergeMessageAq.validator()
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleMergeMessageAq.send()
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleMergeMessageAq.getReceipt(tx.hash);
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
|`handleMergeMessageAq` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the MergeMessageAq transaction|

# useMergeMessageAqSubRoots
<br>
Hook for sending MergeMessageAqSubRoots transactions for the Poll contract.
<br><br>

```js
import { useMergeMessageAqSubRoots } from "@qfi/hooks/Poll";
```
<br>

### **Usage**
<br>

```js
import { useMergeMessageAqSubRoots } from "@qfi/hooks/Poll";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleMergeMessageAqSubRoots ] = useMergeMessageAqSubRoots(contractAddress)

  const [ok, e1] = await handleMergeMessageAqSubRoots.validator(_numSrQueueOps)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleMergeMessageAqSubRoots.send(_numSrQueueOps)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleMergeMessageAqSubRoots.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_numSrQueueOps` | <pre>{<br>     uint256<br>}</pre>  | The _numSrQueueOps param as uint256 value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleMergeMessageAqSubRoots` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the MergeMessageAqSubRoots transaction|

# usePublishMessage
<br>
Hook for sending PublishMessage transactions for the Poll contract.
<br><br>

```js
import { usePublishMessage } from "@qfi/hooks/Poll";
```
<br>

### **Usage**
<br>

```js
import { usePublishMessage } from "@qfi/hooks/Poll";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handlePublishMessage ] = usePublishMessage(contractAddress)

  const [ok, e1] = await handlePublishMessage.validator(_message,_encPubKey)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handlePublishMessage.send(_message,_encPubKey)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handlePublishMessage.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_message` | <pre>{<br>     data:uint256[10]<br>}</pre>  | The _message param as struct IMessage.Message value|
|`_encPubKey` | <pre>{<br>     x:uint256DELIMITERy:uint256<br>}</pre>  | The _encPubKey param as struct IPubKey.PubKey value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handlePublishMessage` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the PublishMessage transaction|

# useRenounceOwnership
<br>
Hook for sending RenounceOwnership transactions for the Poll contract.
<br><br>

```js
import { useRenounceOwnership } from "@qfi/hooks/Poll";
```
<br>

### **Usage**
<br>

```js
import { useRenounceOwnership } from "@qfi/hooks/Poll";

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

# useTransferOwnership
<br>
Hook for sending TransferOwnership transactions for the Poll contract.
<br><br>

```js
import { useTransferOwnership } from "@qfi/hooks/Poll";
```
<br>

### **Usage**
<br>

```js
import { useTransferOwnership } from "@qfi/hooks/Poll";

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

