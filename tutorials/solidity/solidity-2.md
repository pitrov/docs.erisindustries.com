---

layout: content
title: "Tutorials | Solidity 2"

---

## Part II: An action-driven architecture

**Note**: Solidity is still under heavy development, which means running the actual code is hard, and since it's on dev it cannot be assumed to be stable.

### Introduction

The system proposed in part 1 is a good system in theory. It has good separation of concerns, is very modular, and is set up to handle permissions. This is how a typical system would look:

{% image SSoSC2-1.png %}

The way contracts interact with each other is through the Doug contract. This is an illustration of a normal sequence of calls:

{% image SSoSC2-2.png %}

There is a big problem with these type of systems however. Let's say we have a system with 10 controllers and 10 databases. Each controller has 4 functions in their public API on average. What would this mean? It means we need to add 40 (!) functions to the ALC (Application logic contract) in order to access them all. And that's not enough. Every time we update the system and add new controllers, or modify the exiting ones, we'll have to swap out the entire ALC!

We could try and mitigate this by dividing the ALC up into multiple contracts. We could also omit the ALC entirely and instead add multiple controllers that we call directly. Both of these solutions are perfectly fine, but we will no longer have a single entry-point. Moreover, we still have to replace entire contracts in order to do minor changes to the logic.

The system I'm going to propose here allows you to keep one entry point, and allows you to switch out individual functions without touching any other code, it removes the need for controllers entirely, it is scalable, secure, and has got a massive proof-of-concept system behind it - [**The People's Republic of Doug**](https://github.com/androlo/EthereumContracts), or **PRODOUG**. PRODOUG is a smart contract-powered application which works somewhat like a government, having banking, citizenship/titles, a land registry, voting, a forum, and some other things. All in all, it has about 70 unique contracts that are made up of about 20k lines of LLL contract code. It ran on the early Ethereum test-chains.

### TL;DR

Action driven architecture:

- Good, flexible permissions management. One unit of functionality - one action - one permission.  contract is not a good divider, because removing the contract and performing one of its basic functions (like depositing into an account) would normally require very different permission levels. Actions are better.

- Unified interface - all actions work the same way. One pipeline. All action-driven systems are written the same way. Makes auto generation of UI widgets and other things easy, and similarity between systems makes the code easy to read as well.

- Fully extendable. Individual actions can be added and removed without affecting the rest of the system.

- Expensive, as there is lot of code and contracts, so usually not good in production environments.

###Actions

PRODOUG was made secure by encapsulating all the code that users could run in something called actions. All incoming transactions had to be on a specific format, and had to be sent through the 'action manager' contract (with a few exceptions). Here's an example of a super simple action interface:

{% highlight javascript %}
contract SomeAction {
  function execute(type1 par1, type2 par2, ....) constant returns (bool result) {}
}
{% endhighlight %}

The way you manage and call action contracts is by keeping references to them in a manager contract:

{% highlight javascript %}
// The action manager
contract ActionManager {

  // This is where we keep all the actions.
  mapping (bytes32 => address) actions;

  function execute(bytes32 actionName, bytes data) returns (bool) {
    address actn = actions[actionName];
    // If no action with the given name exists - cancel.
    if (actn == 0x0){
      return false;
    }
    // No type conversion possible here, for now.
    actn.call(data);
    return true;
  }

  // Add a new action.
  function addAction(bytes32 name, address addr) {
    actions[name] = addr;
  }

  // Remove an action.
  function removeAction(bytes32 name) constant returns (bool) {
    if (actions[name] == 0x0){
      return false;
    }
    actions[name] = 0x0;
    return true;
  }

}
{% endhighlight %}

**Important**

Since we must allow generic arguments, we must pass something into the action that can stand for any number of arguments of any type - like an `Object` in java, an `interface{}` in Go, or a `*void` in C. This is not fully supported in Solidity, but the first thing that that will be useful in this case is probably going to be byte arrays - which is basically how this worked in LLL. Byte arrays are fully generic, so what we'd do here (for now) is to use a javascript library (such as `web3`) which makes it very simple to convert arguments into properly formatted call-data. There are other solutions out there as well, such as this [Modular-Functions](https://github.com/ConsenSys/Ethereum-Development-Best-Practices/wiki/Modular-Functions.-(WIP)).

**Controller and database**

An action driven system does everything through action contracts. They can contain any logic, but normally they would be fairly small and focus on one or a few things. They have access to Doug, just like normal contracts, but validation is not done through Doug but through the action manager.

If you have read part 1, you'll notice notice that we're cheating here by adding the actions map to the action manager itself, which is wrong. The final contract version will keep it in a database contract.

This is a diagram over how the calls would look in a simple fund manager where you can add and remove users, and make deposits and withdrawals with the bank.

{% image SSoSC2-3.png %}

There is of course no real security yet. At this point we just have a simple action system. People can add actions to it, remove them, and execute them. Before we can add any actions to it we have to add another component - the Doug. Even though the action manager is technically part CMC (contract managing contract), we need a Doug as well. It will link the actions and action manager with the other contracts in the system, such as databases. We'll start with a namereg type Doug similar to the one in part 1.

{% highlight javascript %}
// The Doug contract.
contract Doug {

    address owner;

    // This is where we keep all the contracts.
    mapping (bytes32 => address) public contracts;

    // Constructor
    function Doug(){
        owner = msg.sender;
    }

    // Add a new contract to Doug. This will overwrite an existing contract.
    function addContract(bytes32 name, address addr) returns (bool result) {
        if(msg.sender != owner){
            return false;
        }
        DougEnabled de = DougEnabled(addr);
        // Don't add the contract if this does not work.
        if(!de.setDougAddress(address(this))) {
            return false;
        }
        contracts[name] = addr;
        return true;
    }

    // Remove a contract from Doug. We could also suicide if we want to.
    function removeContract(bytes32 name) returns (bool result) {
       address cName = contracts[name];
        if (cName == 0x0){
            return false;
        }
        if(msg.sender != owner){
            return false;
        }
        // Kill any contracts we remove, for now.
        DougEnabled(cName).remove();
        contracts[name] = 0x0;
        return true;
    }

    function remove(){
        if(msg.sender == owner){
            suicide(owner);
        }
    }

}
{% endhighlight %}

We will also add a super simple bank, or credit contract.

{% highlight javascript %}
// The Bank contract
contract Bank {

  // This is where we keep all the permissions.
  mapping (address => uint) public balances;

  // Endow an address with coins.
  function endow(address addr, uint amount) returns (bool) {
    balances[addr] += amount;
  }

  // Charge an account 'amount' number of coins.
  function charge(address addr, uint amount) returns (bool){
    if (balances[addr] < amount){
      // Bounces if balance is lower then the amount.
      return false;
    }
    balances[addr] -= amount;
    return true;
  }

}
{% endhighlight %}

This is how the system would be initialized:

1) Deploy the Doug contract.
2) Deploy the action manager contract and register it with the Doug contract under the name "actions".
3) Deploy the bank contract and register it with the Doug contract under the name "bank".

What we need do next is to add an action for endowing an address with coins, and one for charging it. We need to add one more function to the actions interface though - the setDougAddress function. This function is what will give actions (indirect) access to all the contracts in the system so they can carry out their work. It is also an important security measure. We will use the DougEnabled contract from part 1.

{% highlight javascript %}
contract DougEnabled {
    address DOUG;

    function setDougAddress(address dougAddr) returns (bool result){
        // Once the doug address is set, don't allow it to be set again, except by the
        // doug contract itself.
        if(DOUG != 0x0 && dougAddr != DOUG){
            return false;
        }
        DOUG = dougAddr;
        return true;
    }

    // Makes it so that Doug is the only contract that may kill it.
    function remove(){
        if(msg.sender == DOUG){
            suicide(DOUG);
        }
    }

}
{% endhighlight %}

The basic action template starts like this:

{% highlight javascript %}
contract Action is DougEnabled {}
{% endhighlight %}

Note that we don't include an 'execute' function for the reasons mentioned above. We will add the execute function on a per-action basis.

To lock these contracts down, we only allow the contract currently registered as `actions` to call the functions. Much like the `FundManagerEnabled` contract in part 1.

{% highlight javascript %}
contract ContractProvider {
  function contracts(bytes32 name) returns (address){}
}

contract ActionManagerEnabled is DougEnabled {
  // Makes it easier to check that action manager is the caller.
  function isActionManager() internal constant returns (bool) {
    if(DOUG != 0x0){
      address am = ContractProvider(DOUG).contracts("actions");
      if (msg.sender == am){
            return true;
      }
    }
    return false;
  }
}
{% endhighlight %}

The new action base class is this:

{% highlight javascript %}
contract Action is ActionManagerEnabled {}
{% endhighlight %}

Here's the endow action contract.

{% highlight javascript %}
// The Bank contract (the "sub interface" we need).
contract Endower {
  function endow(address addr, uint amount) {}
}

// The endow action.
contract ActionEndow is Action {

  function execute(address addr, uint amount) returns (bool) {
    if(!isActionManager()){
      return false;
    }
    ContractProvider dg = ContractProvider(DOUG);
    address endower = dg.getContract("bank");
    if(endower == 0x0){
      return false;
    }
    Endower(endower).endow(addr, amount);
    return true;
  }
}
{% endhighlight %}

This is the action for charging.

{% highlight javascript %}
// The Bank contract (or the "sub interface" we need).
contract Charger {
  function charge(address addr, uint amount) returns (bool) {}
}

// The charge action.
contract ActionCharge {

  function execute(address addr, uint amount) returns (bool) {
    if(!isActionManager()){
      return false;
    }
    ContractProvider dg = ContractProvider(DOUG);
    address charger = dg.getContract("bank");
    if(charger == 0x0){
      return false;
    }
    Charger(charger).charge(addr,amount);
    return true;
  }

}
{% endhighlight %}

When we add these actions to the action manager it will be possible for users to execute them and work with the bank contract that way. Note that it is still possible to interact with the bank contract directly so the actions are not useful yet, but we will fix that.

###Permissions

Step 2 is to control Doug contract access from the outside. It should only be possible to interact with the contracts through actions, and it should only be possible to run actions through the actions manager. The first thing we need to do is make sure the action manager (and later the action database) calls the 'setDougAddress' function that we added to the actions. It should call it and pass the DOUG address to the action as soon as it's registered. If the function returns false, that means it already has a doug address set which in turn means the action should not be registered with the action manager at all. It is unsafe.

We also need to add the DOUG address to the action manager. In fact, the bank and all other contracts like it should have a function that allows the DOUG value to be set so we'll just doug-enable all of them.

The action manager will also get a 'validate' function that can be called by other contracts to ensure that only actions can call them, and we will also break out the actions list into a separate actions database contract so that we can modify the action manager without having to clear all the actions.

**The updated contracts**

This is the new action manager. We're adding the setDougAddress functionality when adding actions and also an 'active contract' field that will be used for validation. We will make `ActionDb`callable only from the action manager now, but there will be an even better system later.

{% highlight javascript %}
contract ActionDb is ActionManagerEnabled {

  // This is where we keep all the actions.
  mapping (bytes32 => address) public actions;

  function addAction(bytes32 name, address addr) returns (bool) {
    if(!isActionManager()){
      return false;
    }
    actions[name] = addr;
    return true;
  }

  function removeAction(bytes32 name) returns (bool) {
    if(!isActionManager()){
      return false;
    }
    if (actions[name] == 0x0){
      return false;
    }
    actions[name] = 0x0;
    return true;
  }

}
{% endhighlight %}

{% highlight javascript %}
// The new action manager.
contract ActionManager is DougEnabled {

  // This is where we keep the "active action".
  address activeAction;

  function ActionManager(){
  }

  function execute(bytes32 actionName, bytes data) returns (bool) {
    address actionDb = ContractProvider(DOUG).contracts("actiondb");
    if (actionDb == 0x0){
      return false;
    }
    address actn = ActionDb(actionDb).actions(actionName);
    // If no action with the given name exists - cancel.
    if (actn == 0x0){
      return false;
    }
    // Set this as the currently active action.
    activeAction = actn;
    // Run the action. Any contract that calls 'validate' now will only get 'true' if the
    // calling contract is 'actn'. Again - no return value check (true/false).
    actn.call(data);
    // Now clear it.
    activeAction = 0x0;
    return true;
  }

  function addAction(bytes32 name, address addr) returns (bool) {
    address actionDb = ContractProvider(DOUG).contracts("actiondb");
    if (actionDb == 0x0){
      return false;
    }
    bool res = ActionDb(actionDb).addAction(name,addr);
    return res;
  }

  function removeAction(bytes32 name) returns (bool) {
    address actionDb = ContractProvider(DOUG).contracts("actiondb");
    if (actionDb == 0x0){
      return false;
    }
    bool res = ActionDb(actionDb).removeAction(name);
    return res;
  }

  // Validate can be called by a contract like the bank to check if the
  // contract calling it has permissions to do so.
  function validate(address addr) constant returns (bool) {
    return addr == activeAction;
  }

}
{% endhighlight %}

Here is the new bank:

{% highlight javascript %}
// Interaction with the action manager.
contract Validator {
  function validate(address addr) constant returns (bool) {}
}

// The Bank contract - now inherits DougEnabled
contract Bank is DougEnabled {

  mapping(address => uint) public balance;

  // Endow an address with coins.
  function endow(address addr, uint amount) returns (bool) {
    address actns = ContractProvider(DOUG).contracts("actions");
    if (actns == 0x0){
      return false;
    }

    Validator v = Validator(actns);
    // If the sender is not validated successfully, break.
    if (!v.validate(msg.sender)){
      return false;
    }
    balance[addr] += amount;
    return true;
  }

  // Charge an account 'amount' number of coins.
  function charge(address addr, uint amount) returns (bool){
    address actns = ContractProvider(DOUG).contracts("actions");
    if (actns == 0x0){
      return;
    }

    Validator v = Validator(actns);
    // If the sender is not validated successfully, break.
    if (!v.validate(msg.sender)){
      return false;
    }

    if (balance[addr] < amount){
      return false;
    }

    balance[addr] -= amount;
    return true;
  }

}
{% endhighlight %}

What we have now is a system that allows us to add contracts (any contracts) to DOUG, and actions. The contracts can not be called except through actions, which means that we can control who gets to call the contracts by controlling who gets to execute actions, and since all actions are run in the same way it will be easy.

There is other benefits to a system like this as well, for example PRODOUG used the fact that all transactions went through the action manager to log them. The log included data such as the caller address, which action was called, the number of the block in which the tx was added, etc. This is good if you want to keep track of what's going on.

###Locking things down

The last thing we have to fix is access to DOUG and the action manager. It is true that the bank and other contracts must be called via actions, but anyone is allowed to add and remove actions, and also to add and remove contracts from DOUG. We're going to start by adding a simple permissions contract that we can use to set permissions for accounts. It'll be registered with DOUG under the name "perms". We're then going to add functions to actions where permissions can be gotten and set. Finally we will complement the system with the following basic actions:

- add action
- remove action
- add contract
- remove contract
- set account permissions
- modify action permissions

Note that there will be an add action action. It will be added to the action database upon creation, but can be replaced later (through the add action action itself).

*Pro tip: Don't remove the add action action.*

{% highlight javascript %}
// Interaction with the action manager.
contract Validator {
  function validate(address addr) constant returns (bool) {}
}

// The Permissions contract
contract Permissions is DougEnabled {

  // This is where we keep all the permissions.
  mapping (address => uint8) public perms;

  function setPermission(address addr, uint8 perm) returns (bool) {
    address actns = ContractProvider(DOUG).contracts("actions");
    if (actns == 0x0){
      return false;
    }
    Validator v = Validator(actns);
    // If the sender is not validated successfully, break.
    if (!v.validate(msg.sender)) {
      return false;
    }

    perms[addr] = perm;
  }

}
{% endhighlight %}

Next we will modify the actions template so that it is possible to get and set the permissions required to execute them. We will add the following functions to the interface:

{% highlight javascript %}
function permission(address addr) constant returns (uint) {}
function setPermission(uint8 permVal) returns (bool) {}
{% endhighlight %}

This is how we'd update the action managers execute function.

{% highlight javascript %}
// For getting permissions.
contract Permissioner {
  function perms(address addr) constant returns (uint8) { }
}

function execute(bytes32 actionName, bytes data) returns (bool) {

  ...

  // Permissions stuff
  address pAddr = ContractProvider(DOUG).getContract("perms");
  // If no permissions contract is added, then no permissions are required.
  if(pAddr != 0x0){
    Permissioner p = Permissioner(pAddr);

    // First we check the permissions of the account that's trying to execute the action.
    uint8 perm = p.getPermission(msg.sender);
    // Now we check the permission that is required to execute the action.
    uint8 permReq = Action(actn).permission();
    // Very simple system.
    if (perm < permReq){
      return false;
    }
  }

  // Proceed to execute the action.

  ...

}
{% endhighlight %}

### The doubly linked list

Before moving on to assembling the final contracts, we need to address something important that we haven't touched upon yet. If we look at Doug, or the action database, or any database contract for that matter, what bad thing do they all have in common? Well, the fact that we have no way of getting a collection of all the entries in the mappings. We have to get entries (such as contracts in the case of Doug) by key. The `mapping` type that backs all these databases has no built in iterator or function to get all elements. One way of adding these features to a mapping it by wrapping it inside a linked list data-structure.

The doubly linked list over a `mapping` provides many benefits. We can add and remove elements dynamically. We can get elements by key. All of these operations are O(1) so it is cheap with regards to computation. The drawback is that it adds extra data to storage, which is not insignificant.

{% image LinkedList.png %}

So, what do we need to add?

**Step 1**

First we need to add three additional fields to the contract - the size of the list, and references to the current head and tail. Let us start with a "generic" linked list contract that uses addresses as keys, and a fixed-length string as the value.

{% highlight javascript %}
contract DoublyLinkedList {
  uint size;
  address tail;
  address head;
  mapping(address => bytes32) elements;
}
{% endhighlight %}

**Step 2**

To keep references to the previous and next element, we need to switch out the bytes32 value with a struct, like this:

{% highlight javascript %}
contract DoublyLinkedList {

  struct Element {
    address previous;
    address next;

    bytes32 data;
  }

  uint size;
  address tail;
  address head;
  mapping(address => Element) elements;
}
{% endhighlight %}

**Step 3**

Now we need to implement the logic for adding and removing elements. Let's start with add. We're going to add elements as the new `head`, and the adding logic for an element is easy: Either the list is **empty**, which means the new element becomes both tail and head, or it is **non empty** and it becomes the new head.

When it comes to linking, we have the same thing. Either the list is empty, and no linking takes place, or the list is non empty and we must do the following steps:

Add the new element as the **next** element of of the current head, and add the current head as the **previous** element of the new element.

Assuming we don't allow elements to be over-written, and we use the mapping as a regular mapping, this is what the contract could look like with an add element function:

{% highlight javascript %}
contract DoublyLinkedList {

  struct Element {
    address previous;
    address next;

    bytes32 data;
  }

  uint size;
  address tail;
  address head;
  mapping(address => Element) elements;

  function addElement(address key, bytes32 data) returns (bool){
    Element elem = elements[key];
    // Check that the key is not already taken. We have no null-check for structs atm., so
    // we need to check the fields inside the structs to verify. This works if the field we
    // check is not allowed to be the null value (which would be "" in the case of strings).
    if(elem.data != ""){
      return false;
    }

    elem.data = data;

      // Two cases - empty or not.
      if(size == 0){
        tail = key;
        head = key;
      } else {
        // Link
        elements[head].next = key;
        elem.previous = head;
        // Set this element as the new head.
        head = key;
      }
      // Regardless of case, increase the size of the list by one.
      size++;
       return true;
  }
}
{% endhighlight %}

All in all, this is not too much code to add, and it's fairly straight forward. When it comes to removal, it's a bit more complicated. We need to consider three basic cases.

Case 1 is that the element we're removing is the only element in the list. In this case we need to set both head and tail to the null value, set size to 0, and remove the element data itself.

Case 2 is that the element is the head. That means we only have to modify the head field, and only the **next** field of one element - namely the element that is the current ones **previous**.

Case 3 is that the element is the tail, in which case it's similar.

Finally, case 4 is if this element is neither head nor tail. In this case the head and tail fields will not be touched, but we need to link "around" this element by changing the **previous** of this ones **next**, and the **next** of this ones **previous**. Here is the final contract with an add and remove function. We also add a special accessor that only gets the `data`, and not the entire element.

{% highlight javascript %}
contract DoublyLinkedList {

  struct Element {
    address previous;
    address next;

    bytes32 data;
  }

  // Make these public.
  uint public size;
  address public tail;
  address public head;
  mapping(address => Element) elements;

  function getData(address key) returns (bytes32){
    return elements[key].data;
  }

  function getElement(address key) constant returns (Element){
    return elements[key];
  }

  function addElement(address key, bytes32 data) returns (bool){
    Element elem = elements[key];
    // Check that the key is not already taken. We have no null-check for structs atm., so
    // we need to check the fields inside the structs to verify. This works if the field we
    // check is not allowed to be null (which would be 0 or 0x0 in the case of addresses).
    if(elem.data != ""){
      return false;
    }

    elem.data = data;

      // Two cases - empty or not.
      if(size == 0){
        tail = key;
        head = key;
      } else {
        // Link
        elements[head].next = key;
        elem.previous = head;
        // Set this element as the new head.
        head = key;
      }
      // Regardless of case, increase the size of the list by one.
      size++;
       return true;
  }


    function removeElement(address key) returns (bool result) {

       Element elem = elements[key];

      // If no element - return false. Nothing to remove.
      if(elem.data == ""){
        return false;
      }

    // If this is the only element.
      if(size == 1){
        tail = 0x0;
        head = 0x0;
      // If this is the head.
      } else if (key == head){
        // Set this ones 'previous' to be the new head, then change its
        // next to be null (used to be this one).
        head = elem.previous;
        elements[head].next = 0x0;
      // If this one is the tail.
      } else if(key == tail){
        tail = elem.next;
        elements[tail].previous = 0x0;
      // Now it's a bit tougher. Getting here means the list has at least 3 elements,
      // and this element must have both a 'previous' and a 'next'.
      } else {
        address prevElem = elem.previous;
        address nextElem = elem.next;
        elements[prevElem].next = nextElem;
        elements[nextElem].previous = prevElem;
      }
      // Regardless of case, we will decrease the list size by 1, and delete the actual entry.
      size--;
      delete elements[key];
      return true;
    }

}
{% endhighlight %}

That is all we need for a basic implementation.

To read this list from javascript, a simple loop could look like this:

{% highlight javascript %}
function getAllElements(){
  var list = [];
  var tail = listContract.tail();
  // isZero should basically just check if the hex-string evaluates to 0. Personally
  // i use bignumber.js for this, and it is included in the string math library
  // node.js decerver will have.
  if(isZero(tail)){
    return list;
  }
  var currentKey = tail;
  while(!isZero(currentKey)){
    var elem = listContract.getElement(currentKey);
    list.push(elem);
    // Slot 1 is 'next', 0 is previous, etc.
    currentKey = elem[1];
  }
  return list;
}
{% endhighlight %}

Note that accessing the element data by index is a bit ugly. Personally I use the json ABI to generate objects of the returned data with the proper names etc., using something like this (which will also be in Eris js):

{% highlight javascript %}
// fName = function name.
function JsonAdapterOut(abi, fName){
  var outputs;
  // Check abi until we find the outputs array for the given function.
  for(var i = 0; i < abi.length; i++){
    var func = abi[i];
    if(abi[i].name.indexOf(fName) > -1){
      outputs = abi[i].outputs;
      break;
    }
  }
  if(outputs === null){
    window.alert("Failed to register json adapter");
  }

  // Syntax would be 'var funcOutputObj = jsonAdapter.convert(theContract.fName(arg0,arg1,...));'
  this.convert = function(data){
    var ret = {};
    for(var i = 0; i < outputs.length; i++){
      ret[outputs[i].name] = data[i].toString();
    }
    return ret;
  }
};
{% endhighlight %}

A note on generic types: Linked lists can not be fully generic right now. It would be doable in theory, if the key and data field in the Element struct were both `bytes` objects, but keys must be elementary types right now. Also, it would be hard to work with and document lists of that kind. Using bytes might be the way of doing it though, until/unless generics is added to Solidity, which is probably far into the future. What this means is a linked list generally has to be tailored for the contract that extends it.

Finally, since linked lists adds to the complexity of a big set of new contracts they will not be added to the finished contracts; instead there is a regular linked-list Doug contract included in the finished contracts section that can be used as a model. In part 3 it will use only linked lists.

### Wrapping up

Before assembling a list of the final contracts, we need to do some final modifications.

Doug will have to be modified. We need it to validate the account when someone is trying to add a contract. This is a bit weird, because how then would you go about adding the action manager contract? One way is to check if and action manager has been added. If there is no action manager then just allow anything. Adding the action manager is what you do to lock the system down. Also, what about removing? How do we remove Doug? Whoever is allowed to do that can kill the entire system with one press of a button, so this would often have to be regulated somehow, but if it's a normal dapp that has an owner it could be as easy as giving the owner the exclusive right to kill the DOUG contract. It does not have to be the same in every system.

Keep in mind, this is just a basic action driven architecture. PRODOUG for example had voting. This ment actions could sometimes  not be carried out directly, instead the action would spawn a copy of itself and be kept in a temporary list until the vote was done. Those types of actions had an init function where all the parameters was set, and then an execute function that was carrried out when a vote was concluded. The way it worked with permissions was that actions did not return a number when asked for the required permission but a name of a poll type. These poll types was kept in a list in a different manager that handled polls. Sometimes the polls were automatic (based on some user property) and sometimes there was a full-on vote with time limits, a quorums and other things. In hindsight, I think it would have been better to allow those type of actions to just store the indata in an indexed list of some sort, to keep track of which data belonged to which caller, until the vote has been resolved. CREATE calls which are very expensive on gas-enabled chains so short lived objects (poltergeists) should generally be kept at a minimum.

Finally, this system is still a bit tainted by the low level system it came out of. Feel like some objects and functionality could be made better? In that case, why not [connect with us at Eris](https://erisindustries.com/). We have a growing community, and just launched our [Educations and Outreach program](https://blog.erisindustries.com/products/2015/03/08/op-cuddlemarmot/). There are of course lots of things that can be done to extend this base system. I will probably write a fresh consensus sub-system later when we get more time to treat and discuss these type of things. Another thing that would not be hard is to allow actions to run other actions. That could be done for example by replacing the active action field with a stack of some description.

###The finished contracts

Gonna throw in a few actions for locking and unlocking of the actionmanager as well as some extra logging stuff. It's good to be able to do that.

**Pure interfaces**

{% highlight javascript %}
contract ContractProvider {
    function contracts(bytes32 name) returns (address){}
}

contract Permissioner {
    function perms(address addr) constant returns (uint8) { }
}

contract Validator {
  function validate(address addr) constant returns (bool) {}
}

contract Charger {
  function charge(address addr, uint amount) returns (bool) {}
}

contract Endower {
  function endow(address addr, uint amount) returns (bool) {}
}
{% endhighlight %}

**Base Contracts**

{% highlight javascript %}
contract DougEnabled {
    address DOUG;

    function setDougAddress(address dougAddr) returns (bool result){
        // Once the doug address is set, don't allow it to be set again, except by the
        // doug contract itself.
        if(DOUG != 0x0 && dougAddr != DOUG){
            return false;
        }
        DOUG = dougAddr;
        return true;
    }

    // Makes it so that Doug is the only contract that may kill it.
    function remove(){
        if(msg.sender == DOUG){
            suicide(DOUG);
        }
    }

}

contract ActionManagerEnabled is DougEnabled {
    // Makes it easier to check that action manager is the caller.
    function isActionManager() internal constant returns (bool) {
        if(DOUG != 0x0){
            address am = ContractProvider(DOUG).contracts("actions");
            if (msg.sender == am){
                return true;
            }
        }
        return false;
    }
}

contract Validee {
    // Makes it easier to check that action manager is the caller.
    function validate() internal constant returns (bool) {
        if(DOUG != 0x0){
            address am = ContractProvider(DOUG).contracts("actions");
            if(am == 0x0){
              return false;
            }
            return Validator(am).validate(msg.sender);
        }
        return false;
    }
}
{% endhighlight %}

ActionDb
{% highlight javascript %}
contract ActionDb is ActionManagerEnabled {

    // This is where we keep all the actions.
    mapping (bytes32 => address) public actions;

    // To make sure we have an add action action, we need to auto generate
    // it as soon as we got the DOUG address.
    function setDougAddress(address dougAddr) returns (bool result) {
      super.setDougAddress(dougAddr);

      var addaction = new ActionAddAction();
      // If this fails, then something is wrong with the add action contract.
      // Will be events logging these things in later parts.
      if(!DougEnabled(addaction).setDougAddress(dougAddr)){
          return false;
      }
      actions["addaction"] = address(addaction);
    }

    function addAction(bytes32 name, address addr) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        // Remember we need to set the doug address for the action to be safe -
        // or someone could use a false doug to do damage to the system.
        // Normally the Doug contract does this, but actions are never added
        // to Doug - they're instead added to this lower-level CMC.
        bool sda = DougEnabled(addr).setDougAddress(DOUG);
        if(!sda){
          return false;
        }
        actions[name] = addr;
        return true;
    }

    function removeAction(bytes32 name) returns (bool) {
        if (actions[name] == 0x0){
            return false;
        }
        if(!isActionManager()){
            return false;
        }
        actions[name] = 0x0;
        return true;
    }

}
{% endhighlight %}

ActionManager
{% highlight javascript %}
contract ActionManager is DougEnabled {

  struct ActionLogEntry {
    address caller;
    bytes32 action;
    uint blockNumber;
    bool success;
  }

  bool LOGGING = true;

  // This is where we keep the "active action".
  // TODO need to keep track of uses of (STOP) as that may cause activeAction
  // to remain set and opens up for abuse. (STOP) is used as a temporary array
  // out-of bounds exception for example (or is planned to), which means be
  // careful. Does it revert the tx entirely now, or does it come with some sort
  // of recovery mechanism? Otherwise it is still super dangerous and should never
  // ever be used. Ever.
  address activeAction;

  uint8 permToLock = 255; // Current max.
  bool locked;

  // Adding a logger here, and not in a separate contract. This is wrong.
  // Will replace with array once that's confirmed to work with structs etc.
  uint public nextEntry = 0;
  mapping(uint => ActionLogEntry) public logEntries;

  function ActionManager(){
    permToLock = 255;
  }

  function execute(bytes32 actionName, bytes data) returns (bool) {
    address actionDb = ContractProvider(DOUG).contracts("actiondb");
    if (actionDb == 0x0){
      _log(actionName,false);
      return false;
    }

    address actn = ActionDb(actionDb).actions(actionName);
    // If no action with the given name exists - cancel.
    if (actn == 0x0){
      _log(actionName,false);
      return false;
    }

      // Permissions stuff
    address pAddr = ContractProvider(DOUG).contracts("perms");
    // Only check permissions if there is a permissions contract.
    if(pAddr != 0x0){
      Permissions p = Permissions(pAddr);

      // First we check the permissions of the account that's trying to execute the action.
      uint8 perm = p.perms(msg.sender);

      // Now we check that the action manager isn't locked down. In that case, special
      // permissions is needed.
      if(locked && perm < permToLock){
        _log(actionName,false);
        return false;
      }

      // Now we check the permission that is required to execute the action.
      uint8 permReq = Action(actn).permission();

      // Very simple system.
      if (perm < permReq){
        _log(actionName,false);
          return false;
      }

    }

    // Set this as the currently active action.
    activeAction = actn;
    // TODO keep up with return values from generic calls.
    // Just assume it succeeds for now (important for logger).
    actn.call(data);
    // Now clear it.
    activeAction = 0x0;
    _log(actionName,true);
    return true;
  }

  function lock() returns (bool) {
    if(msg.sender != activeAction){
      return false;
    }
    if(locked){
      return false;
    }
    locked = true;
  }

  function unlock() returns (bool) {
    if(msg.sender != activeAction){
      return false;
    }
    if(!locked){
      return false;
    }
    locked = false;
  }

  // Validate can be called by a contract like the bank to check if the
  // contract calling it has permissions to do so.
  function validate(address addr) constant returns (bool) {
    return addr == activeAction;
  }

  function _log(bytes32 actionName, bool success) internal {
    // TODO check if this is really necessary in an internal function.
    if(msg.sender != address(this)){
      return;
    }
    ActionLogEntry le = logEntries[nextEntry++];
    le.caller = msg.sender;
    le.action = actionName;
    le.success = success;
    le.blockNumber = block.number;
  }

}
{% endhighlight %}

Doug
{% highlight javascript %}
contract Doug {

    address owner;

    // This is where we keep all the contracts.
    mapping (bytes32 => address) public contracts;

    // Constructor
    function Doug(){
        owner = msg.sender;
    }

    // Add a new contract to Doug. This will overwrite an existing contract.
    function addContract(bytes32 name, address addr) returns (bool result) {
    // Only do validation if there is an actions contract.
    var am = contracts["actions"];
    if(am != 0x0 || contracts["actionsdb"] == 0x0){
      // Check that the account trying to add a contract is a registered action.
          bool val = Validator(am).validate(msg.sender);
          if(!val){
            return false;
      }
       }
       DougEnabled de = DougEnabled(addr);
       // Don't add the contract if this does not work.
    if(!de.setDougAddress(address(this))) {
      return false;
    }
    contracts[name] = addr;
       return true;
  }

    // Remove a contract from Doug. We could also suicide if we want to.
    function removeContract(bytes32 name) returns (bool result) {
       address cName = contracts[name];
       if (cName == 0x0){
           return false;
       }
       // Only do validation if there is an actions contract.
       var am = contracts["actions"];
    if(am != 0x0 || contracts["actionsdb"] == 0x0){
          // Check that the account trying to add a contract is a registered action.
          bool val = Validator(am).validate(msg.sender);
          if(!val){
            return false;
          }
        }
        // Kill any contracts we remove, for now.
        DougEnabled(cName).remove();
        contracts[name] = 0x0;
        return true;
    }

    function remove(){
        if(msg.sender == owner){
            suicide(owner);
        }
    }

}
{% endhighlight %}

Bank
{% highlight javascript %}
contract Bank is Validee {

  mapping(address => uint) balance;

  // Endow an address with coins.
  function endow(address addr, uint amount) returns (bool) {
    if (!validate()){
      return false;
    }
    balance[addr] += amount;
    return true;
  }

  // Charge an account 'amount' number of coins.
  function charge(address addr, uint amount) returns (bool){
    if (balance[addr] < amount){
      return false;
    }
    if (!validate()){
      return false;
    }
    balance[addr] -= amount;
    return true;
  }

}
{% endhighlight %}

Permissions
{% highlight javascript %}
// The Permissions contract
contract Permissions is Validee {

    // This is where we keep all the permissions.
    mapping (address => uint8) public perms;

    function setPermission(address addr, uint8 perm) returns (bool) {
    if (!validate()){
      return false;
    }
    perms[addr] = perm;
    }

}
{% endhighlight %}

Actions


{% highlight javascript %}
contract Action is ActionManagerEnabled, Validee {
  // Note auto accessor.
  uint8 public permission;

  function setPermission(uint8 permVal) returns (bool) {
    if(!validate()){
      return false;
    }
    permission = permVal;
  }
}

// Add action. NOTE: Overwrites currently added actions with the same name.
contract ActionAddAction is Action {

    function execute(bytes32 name, address addr) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        ContractProvider dg = ContractProvider(DOUG);
        address adb = dg.contracts("actiondb");
        if(adb == 0x0){
            return false;
        }
        return ActionDb(adb).addAction(name, addr);
    }

}

// Remove action. Does not allow 'addaction' to be removed, though that it can still
// be done by overwriting this action with one that allows it.
contract ActionRemoveAction is Action {

    function execute(bytes32 name) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        ContractProvider dg = ContractProvider(DOUG);
        address adb = dg.contracts("actiondb");
        if(adb == 0x0){
            return false;
        }
        if(name == "addaction"){
          return false;
        }
        return ActionDb(adb).removeAction(name);
    }

}

// Lock actions. Makes it impossible to run actions for everyone but the owner.
// It is good to unlock the actions manager while replacing parts of the system
// for example.
contract ActionLockActions is Action {

    function execute() returns (bool) {
        if(!isActionManager()){
            return false;
        }
        ContractProvider dg = ContractProvider(DOUG);
        address am = dg.contracts("actions");
        if(am == 0x0){
            return false;
        }
        return ActionManager(am).lock();
    }

}

// Unlock actions. Makes it possible for everyone to run actions.
contract ActionUnlockActions is Action {

    function execute() returns (bool) {
        if(!isActionManager()){
            return false;
        }
        ContractProvider dg = ContractProvider(DOUG);
        address am = dg.contracts("actions");
        if(am == 0x0){
            return false;
        }
        return ActionManager(am).unlock();
    }

}

// Add contract.
contract ActionAddContract is Action {

    function execute(bytes32 name, address addr) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        Doug d = Doug(DOUG);
        return d.addContract(name,addr);
    }

}

// Remove contract.
contract ActionRemoveContract is Action {

    function execute(bytes32 name) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        Doug d = Doug(DOUG);
        return d.removeContract(name);
    }

}

// The charge action.
contract ActionCharge is Action {

    function execute(address addr, uint amount) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        ContractProvider dg = ContractProvider(DOUG);
        address charger = dg.contracts("bank");
        if(charger == 0x0){
            return false;
        }
        return Charger(charger).charge(addr,amount);
    }

}

// The endow action.
contract ActionEndow is Action {

    function execute(address addr, uint amount) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        ContractProvider dg = ContractProvider(DOUG);
        address endower = dg.contracts("bank");
        if(endower == 0x0){
            return false;
        }
        return Endower(endower).endow(addr,amount);
    }

}

// The set user permission action.
contract ActionSetUserPermission is Action {

    function execute(address addr, uint8 perm) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        ContractProvider dg = ContractProvider(DOUG);
        address perms = dg.contracts("perms");
        if(perms == 0x0){
            return false;
        }
        return Permissions(perms).setPermission(addr,perm);
    }

}

// The set action permission. This is the permission level required to run the action.
contract ActionSetActionPermission is Action {

    function execute(bytes32 name, uint8 perm) returns (bool) {
        if(!isActionManager()){
            return false;
        }
        ContractProvider dg = ContractProvider(DOUG);
        address adb = dg.contracts("actiondb");
        if(adb == 0x0){
            return false;
        }
        var action = ActionDb(adb).actions(name);
        Action(action).setPermission(perm);
    }

}
{% endhighlight %}

Linked list Doug
{% highlight javascript %}
contract DougEnabled {
    function setDougAddress(address dougAddr) returns (bool result){}
    function remove(){}
}

//The Doug database contract.
contract DougDb {

     // List element
  struct Element {
    bytes32 prev;
    bytes32 next;
    // Data
    bytes32 contractName;
    address contractAddress;
  }

  uint public size;
  bytes32 public tail;
  bytes32 public head;
    mapping (bytes32 => Element) list;

  // Add a new contract. This will overwrite an existing contract. 'internal' modifier means
  // it has to be called by an implementing class.
  function _addElement(bytes32 name, address addr) internal returns (bool result) {
       Element elem = list[name];

      elem.contractName = name;
      elem.contractAddress = addr;

      // Two cases - empty or not.
      if(size == 0){
        tail = name;
        head = name;
      } else {
        list[head].next = name;
        list[name].prev = head;
        head = name;
      }
      size++;
       return true;
    }

    // Remove a contract from Doug (we could also suicide the contract if we want to).
    function _removeElement(bytes32 name) internal returns (bool result) {

       Element elem = list[name];
      if(elem.contractName == ""){
        return false;
      }

      if(size == 1){
        tail = "";
        head = "";
      } else if (name == head){
        head = elem.prev;
        list[head].next = "";
      } else if(name == tail){
        tail = elem.next;
        list[tail].prev = "";
      } else {
        bytes32 prevElem = elem.prev;
        bytes32 nextElem = elem.next;
        list[prevElem].next = nextElem;
        list[nextElem].prev = prevElem;
      }
      size--;
      delete list[name];
      return true;
  }

  // Should be safe to update to returning 'Element' instead
  function getElement(bytes32 name) constant returns (bytes32 prev, bytes32 next, bytes32 contractName, address contractAddress) {

      Element elem = list[name];
      if(elem.contractName == ""){
        return;
      }
      prev = elem.prev;
      next = elem.next;
      contractName = elem.contractName;
      contractAddress = elem.contractAddress;
  }

}


/// @title DOUG
/// @author Andreas Olofsson
/// @notice This contract is used to register other contracts by name.
/// @dev Stores the contracts as entries in a doubly linked list, so that
/// the list of elements can be gotten.
contract Doug is DougDb {

  address owner;

     // When adding a contract.
  event AddContract(address indexed caller, bytes32 indexed name, uint16 indexed code);
  // When removing a contract.
  event RemoveContract(address indexed caller, bytes32 indexed name, uint16 indexed code);

    // Constructor
    function Doug(){
        owner = msg.sender;
    }

    /// @notice Add a contract to Doug. This contract should extend DougEnabled, because
    /// Doug will attempt to call 'setDougAddress' on that contract before allowing it
    /// to register. It will also ensure that the contract cannot be suicided by anyone
    /// other then Doug. Finally, Doug allows over-writing of previous contracts with
    /// the same name, thus you may replace contracts with new ones.
    /// @param name The bytes32 name of the contract.
    /// @param addr The address to the actual contract.
    /// @returns boolean showing if the adding succeeded or failed.
    function addContract(bytes32 name, address addr) returns (bool result) {
       // Only the owner may add, and the contract has to be DougEnabled and
       // return true when setting the Doug address.
    if(msg.sender != owner || !DougEnabled(addr).setDougAddress(address(this))){
      // Access denied. Should divide these up into two maybe.
      AddContract(msg.sender, name, 403);
      return false;
    }
       // Add to contract.
       bool ae = _addElement(name, addr);
       if (ae) {
          AddContract(msg.sender, name, 201);
       } else {
          // Can't overwrite.
          AddContract(msg.sender, name, 409);
       }
       return ae;
  }

    /// @notice Remove a contract from doug.
    /// @param name The bytes32 name of the contract.
    /// @returns boolean showing if the removal succeeded or failed.
    function removeContract(bytes32 name) returns (bool result) {
        if(msg.sender != owner){
            RemoveContract(msg.sender, name, 403);
            return false;
        }
        bool re = _removeElement(name);
        if(re){
          RemoveContract(msg.sender, name, 200);
        } else {
          // Can't remove, it's already gone.
          RemoveContract(msg.sender, name, 410);
        }
        return re;
    }

    /// @notice Gets a contract from Doug.
    /// @param name The bytes32 name of the contract.
    /// @returns The address of the contract. If no contract with that name exists, it will
    /// return zero.
    function contracts(bytes32 name) returns (address addr){
      return list[name].contractAddress;
    }

    /// @notice Remove (suicide) Doug.
    function remove(){
        if(msg.sender == owner){
            // Finally, remove doug. Doug will now have all the funds of the other contracts,
            // and when suiciding it will all go to the owner.
            suicide(owner);
        }
    }

}
{% endhighlight %}

### Coming up

In the next part we will learn how to integrate smart contract systems into applications by RPCing them through a javascript API. This involves an in-depth look at a number of important solidity features, mainly `events`. Events are essential in finding out the result of transactions, as they can be used to print messages into the client log which can be captured and read using a combination of `filters` and `watches` (there are a few events in the linked list Doug contract btw.). It is a lot less complicated then it sounds, much thanks to the innovative `web3` javascript library.

There will also be some other things like basic blockchain inspection, which can be useful in order to avoid and recover from errors. Calling the blockchain client from javascript (or anywhere else) is essentially I/O, and some basic knowledge of the system is needed in order to work with it properly.

Sometime later I will create a base action driven system for the Eris stack if someone wants to try. It would include an action manager, Doug, and a few basic services and actions just to get things started. That and some permissions systems and configurations, but I assume a set of standard options will do in most cases and those can be made available. It will also include a javascript deployment and auto test script to use with our node.js stuff (already been done), and likely also .pdx deployment scripts for EPM (the Eris package manager, our deployment and chain management cli tool). If it "catches on", there may also be a simple admin editor for working with it, where you can list the actions, add and remove actions via javascript etc. This all depends on how interested people are. I like it myself, beacuse building a DApp using this system would mean less focus on system design and more on the actual business logic, so I hope it may be successful. All you have to do is throw a few basic database-type contracts and actions in, and actions are very small due to all the logic they get automatically from their base classes.

I am also going to add custom action contract objects to the `web3` fork/extension we're working with, basically singleton contracts that works like the regular one except the calls are made to the action manager and they are automatically set up for that. Also, since the json abi for a contract gives the type and name of each field, it will also be possible to functions on these contract for auto-generating html templates that can be used in the management UI. There could be a global option on what type of template to use eg plain html, angular.js etc. This is something my colleagues pushed for in the early "Project Douglas" days, and is even part of the `c3d` specification. Not working alone here...

### Finally

Credits to `Solidity` and `web3` devs who are adding well-functioning and innovative tools to the smart contract-writing toolbox.
