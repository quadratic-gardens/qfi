# 🖇 PollProcessorAndTallyer Hooks

React hooks to send transactions for the PollProcessorAndTallyer contract using Ethers.js
<br><br><br><br>

# useProcessMessages
<br>
Hook for sending ProcessMessages transactions for the PollProcessorAndTallyer contract.
<br><br>

```js
import { useProcessMessages } from "@qfi/hooks/PollProcessorAndTallyer";
```
<br>

### **Usage**
<br>

```js
import { useProcessMessages } from "@qfi/hooks/PollProcessorAndTallyer";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleProcessMessages ] = useProcessMessages(contractAddress)

  const [ok, e1] = await handleProcessMessages.validator(_poll,_newSbCommitment,_proof)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleProcessMessages.send(_poll,_newSbCommitment,_proof)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleProcessMessages.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_poll` | <pre>{<br>     address<br>}</pre>  | The _poll param as contract Poll value|
|`_newSbCommitment` | <pre>{<br>     uint256<br>}</pre>  | The _newSbCommitment param as uint256 value|
|`_proof` | <pre>{<br>     uint256[8]<br>}</pre>  | The _proof param as uint256[8] value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleProcessMessages` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the ProcessMessages transaction|

# useRenounceOwnership
<br>
Hook for sending RenounceOwnership transactions for the PollProcessorAndTallyer contract.
<br><br>

```js
import { useRenounceOwnership } from "@qfi/hooks/PollProcessorAndTallyer";
```
<br>

### **Usage**
<br>

```js
import { useRenounceOwnership } from "@qfi/hooks/PollProcessorAndTallyer";

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

# useTallyVotes
<br>
Hook for sending TallyVotes transactions for the PollProcessorAndTallyer contract.
<br><br>

```js
import { useTallyVotes } from "@qfi/hooks/PollProcessorAndTallyer";
```
<br>

### **Usage**
<br>

```js
import { useTallyVotes } from "@qfi/hooks/PollProcessorAndTallyer";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleTallyVotes ] = useTallyVotes(contractAddress)

  const [ok, e1] = await handleTallyVotes.validator(_poll,_newTallyCommitment,_proof)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleTallyVotes.send(_poll,_newTallyCommitment,_proof)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleTallyVotes.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_poll` | <pre>{<br>     address<br>}</pre>  | The _poll param as contract Poll value|
|`_newTallyCommitment` | <pre>{<br>     uint256<br>}</pre>  | The _newTallyCommitment param as uint256 value|
|`_proof` | <pre>{<br>     uint256[8]<br>}</pre>  | The _proof param as uint256[8] value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleTallyVotes` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the TallyVotes transaction|

# useTransferOwnership
<br>
Hook for sending TransferOwnership transactions for the PollProcessorAndTallyer contract.
<br><br>

```js
import { useTransferOwnership } from "@qfi/hooks/PollProcessorAndTallyer";
```
<br>

### **Usage**
<br>

```js
import { useTransferOwnership } from "@qfi/hooks/PollProcessorAndTallyer";

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

