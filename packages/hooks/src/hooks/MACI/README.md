# 🖇 MACI Hooks

React hooks to send transactions for the MACI contract using Ethers.js
<br><br><br><br>

# useDeployPoll
<br>
Hook for sending DeployPoll transactions for the MACI contract.
<br><br>

```js
import { useDeployPoll } from "@qfi/hooks/MACI";
```
<br>

### **Usage**
<br>

```js
import { useDeployPoll } from "@qfi/hooks/MACI";

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
|`_maxValues` | <pre>{<br>     maxMessages:uint256DELIMITERmaxVoteOptions:uint256<br>}</pre>  | The _maxValues param as struct Params.MaxValues value|
|`_treeDepths` | <pre>{<br>     intStateTreeDepth:uint8DELIMITERmessageTreeSubDepth:uint8DELIMITERmessageTreeDepth:uint8DELIMITERvoteOptionTreeDepth:uint8<br>}</pre>  | The _treeDepths param as struct Params.TreeDepths value|
|`_coordinatorPubKey` | <pre>{<br>     x:uint256DELIMITERy:uint256<br>}</pre>  | The _coordinatorPubKey param as struct IPubKey.PubKey value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleDeployPoll` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the DeployPoll transaction|

# useInit
<br>
Hook for sending Init transactions for the MACI contract.
<br><br>

```js
import { useInit } from "@qfi/hooks/MACI";
```
<br>

### **Usage**
<br>

```js
import { useInit } from "@qfi/hooks/MACI";

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

# useMergeStateAq
<br>
Hook for sending MergeStateAq transactions for the MACI contract.
<br><br>

```js
import { useMergeStateAq } from "@qfi/hooks/MACI";
```
<br>

### **Usage**
<br>

```js
import { useMergeStateAq } from "@qfi/hooks/MACI";

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
Hook for sending MergeStateAqSubRoots transactions for the MACI contract.
<br><br>

```js
import { useMergeStateAqSubRoots } from "@qfi/hooks/MACI";
```
<br>

### **Usage**
<br>

```js
import { useMergeStateAqSubRoots } from "@qfi/hooks/MACI";

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

# useRenounceOwnership
<br>
Hook for sending RenounceOwnership transactions for the MACI contract.
<br><br>

```js
import { useRenounceOwnership } from "@qfi/hooks/MACI";
```
<br>

### **Usage**
<br>

```js
import { useRenounceOwnership } from "@qfi/hooks/MACI";

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

# useSignUp
<br>
Hook for sending SignUp transactions for the MACI contract.
<br><br>

```js
import { useSignUp } from "@qfi/hooks/MACI";
```
<br>

### **Usage**
<br>

```js
import { useSignUp } from "@qfi/hooks/MACI";

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
|`_pubKey` | <pre>{<br>     x:uint256DELIMITERy:uint256<br>}</pre>  | The _pubKey param as struct IPubKey.PubKey value|
|`_signUpGatekeeperData` | <pre>{<br>     bytes<br>}</pre>  | The _signUpGatekeeperData param as bytes value|
|`_initialVoiceCreditProxyData` | <pre>{<br>     bytes<br>}</pre>  | The _initialVoiceCreditProxyData param as bytes value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleSignUp` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the SignUp transaction|

# useTransferOwnership
<br>
Hook for sending TransferOwnership transactions for the MACI contract.
<br><br>

```js
import { useTransferOwnership } from "@qfi/hooks/MACI";
```
<br>

### **Usage**
<br>

```js
import { useTransferOwnership } from "@qfi/hooks/MACI";

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

