# 🖇 GrantRoundFactory Hooks

React hooks to send transactions for the GrantRoundFactory contract using Ethers.js
<br><br><br><br>

# useDeployGrantRound
<br>
Hook for sending DeployGrantRound transactions for the GrantRoundFactory contract.
<br><br>

```js
import { useDeployGrantRound } from "@qfi/hooks/GrantRoundFactory";
```
<br>

### **Usage**
<br>

```js
import { useDeployGrantRound } from "@qfi/hooks/GrantRoundFactory";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleDeployGrantRound ] = useDeployGrantRound(contractAddress)

  const [ok, e1] = await handleDeployGrantRound.validator(_voiceCreditFactor,_coordinator,_nativeToken,_duration,_maxValues,_treeDepths,_batchSizes,_coordinatorPubKey,_vkRegistry,_maci,_grantRoundOwner)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleDeployGrantRound.send(_voiceCreditFactor,_coordinator,_nativeToken,_duration,_maxValues,_treeDepths,_batchSizes,_coordinatorPubKey,_vkRegistry,_maci,_grantRoundOwner)
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
|`_voiceCreditFactor` | <pre>{<br>     uint256<br>}</pre>  | The _voiceCreditFactor param as uint256 value|
|`_coordinator` | <pre>{<br>     address<br>}</pre>  | The _coordinator param as address value|
|`_nativeToken` | <pre>{<br>     address<br>}</pre>  | The _nativeToken param as contract ERC20 value|
|`_duration` | <pre>{<br>     uint256<br>}</pre>  | The _duration param as uint256 value|
|`_maxValues` | <pre>{<br>     maxMessages:uint256<br>     maxVoteOptions:uint256<br>}</pre>  | The _maxValues param as struct Params.MaxValues value|
|`_treeDepths` | <pre>{<br>     intStateTreeDepth:uint8<br>     messageTreeSubDepth:uint8<br>     messageTreeDepth:uint8<br>     voteOptionTreeDepth:uint8<br>}</pre>  | The _treeDepths param as struct Params.TreeDepths value|
|`_batchSizes` | <pre>{<br>     messageBatchSize:uint8<br>     tallyBatchSize:uint8<br>}</pre>  | The _batchSizes param as struct Params.BatchSizes value|
|`_coordinatorPubKey` | <pre>{<br>     x:uint256<br>     y:uint256<br>}</pre>  | The _coordinatorPubKey param as struct IPubKey.PubKey value|
|`_vkRegistry` | <pre>{<br>     address<br>}</pre>  | The _vkRegistry param as contract VkRegistry value|
|`_maci` | <pre>{<br>     address<br>}</pre>  | The _maci param as contract IMACI value|
|`_grantRoundOwner` | <pre>{<br>     address<br>}</pre>  | The _grantRoundOwner param as address value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleDeployGrantRound` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the DeployGrantRound transaction|

# useRenounceOwnership
<br>
Hook for sending RenounceOwnership transactions for the GrantRoundFactory contract.
<br><br>

```js
import { useRenounceOwnership } from "@qfi/hooks/GrantRoundFactory";
```
<br>

### **Usage**
<br>

```js
import { useRenounceOwnership } from "@qfi/hooks/GrantRoundFactory";

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
Hook for sending SetMessageAqFactory transactions for the GrantRoundFactory contract.
<br><br>

```js
import { useSetMessageAqFactory } from "@qfi/hooks/GrantRoundFactory";
```
<br>

### **Usage**
<br>

```js
import { useSetMessageAqFactory } from "@qfi/hooks/GrantRoundFactory";

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

# useSetRecipientRegistry
<br>
Hook for sending SetRecipientRegistry transactions for the GrantRoundFactory contract.
<br><br>

```js
import { useSetRecipientRegistry } from "@qfi/hooks/GrantRoundFactory";
```
<br>

### **Usage**
<br>

```js
import { useSetRecipientRegistry } from "@qfi/hooks/GrantRoundFactory";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleSetRecipientRegistry ] = useSetRecipientRegistry(contractAddress)

  const [ok, e1] = await handleSetRecipientRegistry.validator(_recipientRegistry)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleSetRecipientRegistry.send(_recipientRegistry)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleSetRecipientRegistry.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_recipientRegistry` | <pre>{<br>     address<br>}</pre>  | The _recipientRegistry param as contract IRecipientRegistry value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleSetRecipientRegistry` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the SetRecipientRegistry transaction|

# useTransferOwnership
<br>
Hook for sending TransferOwnership transactions for the GrantRoundFactory contract.
<br><br>

```js
import { useTransferOwnership } from "@qfi/hooks/GrantRoundFactory";
```
<br>

### **Usage**
<br>

```js
import { useTransferOwnership } from "@qfi/hooks/GrantRoundFactory";

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

