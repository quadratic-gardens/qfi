# 🖇 SimpleRecipientRegistry Hooks

React hooks to send transactions for the SimpleRecipientRegistry contract using Ethers.js
<br><br><br><br>

# useAddRecipient
<br>
Hook for sending AddRecipient transactions for the SimpleRecipientRegistry contract.
<br><br>

```js
import { useAddRecipient } from "@qfi/hooks/SimpleRecipientRegistry";
```
<br>

### **Usage**
<br>

```js
import { useAddRecipient } from "@qfi/hooks/SimpleRecipientRegistry";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleAddRecipient ] = useAddRecipient(contractAddress)

  const [ok, e1] = await handleAddRecipient.validator(_recipient,_metadata)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleAddRecipient.send(_recipient,_metadata)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleAddRecipient.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_recipient` | <pre>{<br>     address<br>}</pre>  | The _recipient param as address value|
|`_metadata` | <pre>{<br>     string<br>}</pre>  | The _metadata param as string value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleAddRecipient` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the AddRecipient transaction|

# useRemoveRecipient
<br>
Hook for sending RemoveRecipient transactions for the SimpleRecipientRegistry contract.
<br><br>

```js
import { useRemoveRecipient } from "@qfi/hooks/SimpleRecipientRegistry";
```
<br>

### **Usage**
<br>

```js
import { useRemoveRecipient } from "@qfi/hooks/SimpleRecipientRegistry";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleRemoveRecipient ] = useRemoveRecipient(contractAddress)

  const [ok, e1] = await handleRemoveRecipient.validator(_recipientId)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleRemoveRecipient.send(_recipientId)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleRemoveRecipient.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_recipientId` | <pre>{<br>     bytes32<br>}</pre>  | The _recipientId param as bytes32 value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleRemoveRecipient` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the RemoveRecipient transaction|

# useRenounceOwnership
<br>
Hook for sending RenounceOwnership transactions for the SimpleRecipientRegistry contract.
<br><br>

```js
import { useRenounceOwnership } from "@qfi/hooks/SimpleRecipientRegistry";
```
<br>

### **Usage**
<br>

```js
import { useRenounceOwnership } from "@qfi/hooks/SimpleRecipientRegistry";

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

# useSetMaxRecipients
<br>
Hook for sending SetMaxRecipients transactions for the SimpleRecipientRegistry contract.
<br><br>

```js
import { useSetMaxRecipients } from "@qfi/hooks/SimpleRecipientRegistry";
```
<br>

### **Usage**
<br>

```js
import { useSetMaxRecipients } from "@qfi/hooks/SimpleRecipientRegistry";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleSetMaxRecipients ] = useSetMaxRecipients(contractAddress)

  const [ok, e1] = await handleSetMaxRecipients.validator(_maxRecipients)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleSetMaxRecipients.send(_maxRecipients)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleSetMaxRecipients.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_maxRecipients` | <pre>{<br>     uint256<br>}</pre>  | The _maxRecipients param as uint256 value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleSetMaxRecipients` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the SetMaxRecipients transaction|

# useTransferOwnership
<br>
Hook for sending TransferOwnership transactions for the SimpleRecipientRegistry contract.
<br><br>

```js
import { useTransferOwnership } from "@qfi/hooks/SimpleRecipientRegistry";
```
<br>

### **Usage**
<br>

```js
import { useTransferOwnership } from "@qfi/hooks/SimpleRecipientRegistry";

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

