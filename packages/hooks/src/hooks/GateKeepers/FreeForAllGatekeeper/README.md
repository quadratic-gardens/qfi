# 🖇 FreeForAllGatekeeper Hooks

React hooks to send transactions for the FreeForAllGatekeeper contract using Ethers.js
<br><br><br><br>

# useRegister
<br>
Hook for sending Register transactions for the FreeForAllGatekeeper contract.
<br><br>

```js
import { useRegister } from "@qfi/hooks/FreeForAllGatekeeper";
```
<br>

### **Usage**
<br>

```js
import { useRegister } from "@qfi/hooks/FreeForAllGatekeeper";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleRegister ] = useRegister(contractAddress)

  const [ok, e1] = await handleRegister.validator(arg0 ,arg1 )
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleRegister.send(arg0 ,arg1 )
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleRegister.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`arg0` | <pre>{<br>     address<br>}</pre>  | The arg0 param as address value|
|`arg1` | <pre>{<br>     bytes<br>}</pre>  | The arg1 param as bytes value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleRegister` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the Register transaction|

# useSetMaciInstance
<br>
Hook for sending SetMaciInstance transactions for the FreeForAllGatekeeper contract.
<br><br>

```js
import { useSetMaciInstance } from "@qfi/hooks/FreeForAllGatekeeper";
```
<br>

### **Usage**
<br>

```js
import { useSetMaciInstance } from "@qfi/hooks/FreeForAllGatekeeper";

try{
  const [ { transaction, receipt, error, loading, loadingMessage}, handleSetMaciInstance ] = useSetMaciInstance(contractAddress)

  const [ok, e1] = await handleSetMaciInstance.validator(_maci)
  if (e1 != null) throw Error(e1)

  const [tx, e2] = await handleSetMaciInstance.send(_maci)
  if (e2 != null) throw Error(e2)

  const [rcpt, e3] = await handleSetMaciInstance.getReceipt(tx.hash);
  if (e3 != null) throw Error(e3)


} catch (e) {
  console.log(e.message)
}
```

### **Parameters**
| <div style="min-width:180px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_maci` | <pre>{<br>     address<br>}</pre>  | The _maci param as contract MACI value|

### **Return Values**
| <div style="min-width:150px">Name</div> | <div style="width:420px">Type</div>  | <div style="width:20ch; min-width:20ch">Type</div>                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`{ transaction, receipt, error, loading, loadingMessage}` | <pre>{<br>    transaction?: Transaction<br>    receipt:? any <br>    error?: Error<br>    loading:? boolean<br>    loadingMessage:? string<br>}</pre> | Transaction state hooks
|`handleSetMaciInstance` |  <pre>{<br>    validator: (params) => [boolean, Error],<br>    send: (params) => [tx, Error],<br>    getReceipt:(hash:string) => [rcpt, Error]<br>} </pre>| Method handlers for the SetMaciInstance transaction|

