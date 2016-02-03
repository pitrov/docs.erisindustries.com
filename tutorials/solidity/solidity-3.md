---

layout: docs
title: "Tutorials | Solidity 3"

---

## Part III: Solidity language features

**Note**: Solidity is still under heavy development, which means running the actual code is hard, and since it's on dev it cannot be assumed to be stable.

### Introduction

This blog post is about the language features of Solidity. I will be going over some of the basic ones, types, interfaces, events, errors (or lack thereof), and give a few examples of how these works in practice.

### Types - the basics

*Type-related information can be found in the official Solidity tutorial, under [types](https://github.com/ethereum/wiki/wiki/Solidity-Tutorial#types). It is good to have read that first.*

Solidity is a `statically typed language`, like for example C/C++ and Java. This may be new to people that have been working mostly with scripting/interpreted languages. What `statically typed` means is that when you declare a variable you must also include its type. For example: `myVar = 55;`is not allowed, but `int myInt = 55;` is. Types can be inferred by using `var` i.e. `var myVar = 55;` is allowed and will automatically get the type `uint8`. You must initialize a `var` when declaring it.

Types are checked at compile-time, so if you make a mistake you will get a compiler error. For example, this is not possible:

{% highlight javascript %}

contract Test {
  bool bVar;

  function causesError(address addr){
    bVar = addr;
  }
}

{% endhighlight %}

The error it would throw is this: `Error: Type address not implicitly convertible to expected type bool.`

#### Type conversion

The compiler allows you to convert between types in certain cases. Let's say you have the number `1` stored in a `uint` variable, and you want to use it in another variable of type `int`. That is possible - but you generally have to do the conversion yourself. This is how you would do it:

{% highlight javascript %}

uint x = 1;
int y = int(x);

{% endhighlight %}

Type conversion is also checked at compile time and will generally be caught but there are exceptions; the most important one is when converting an address to a contract type. These type of casts can lead to bugs. We will be looking at some examples in a later section.

Finally, type conversion is something that should be used with care. It's good in some cases, but excessive and/or careless casting is usually a sign that the code is not well written and can sometimes have bad consequences (such as data-loss). Remember types are there for a reason.

### Contracts and Interfaces

Solidity uses the `contract` data-type to model smart contracts. It is very similar to a `class`.

A `contract` has a number of fields and methods; for example, the `contract` type can have a constructor, it can inherit from other contracts, etc.

The official tutorial has a number of simple [example contracts](https://github.com/ethereum/wiki/wiki/Solidity-Tutorial#simple-example) in it. Recently the Solidity designers have added `interface contracts`. These contracts allow functions to be abstract (have no body). Technically it has been possible to use "interface-ish" contracts before, but it has not been possible to make them truly abstract until now.

As I write this (2015-04-14) they haven't implemented all the features (as per the [story](https://www.pivotaltracker.com/story/show/88344782)), but it's practically good to go.

Here is an example. It is a simple interface with only one function in it.

{% highlight javascript %}

contract Depositor {
  function deposit(uint amount);
}

{% endhighlight %}

This function has no body, so cannot run on its own. Now we want to make a contract that is a `Depositor`, which means it implements this interface.

{% highlight javascript %}

contract HeyImADepositor is Depositor {

}

{% endhighlight %}

No, you're not. Why? You're not implementing the deposit function. If I try and compile this, it will fail. As I write this I don't yet get a compiler error, but the contract will not work (no bytecode). In order for the contract to work it has to create a function with the same signature as the deposit function but with a proper body.

{% highlight javascript %}

contract OkButNowIAm is Depositor {
  function deposit(uint amount) {}
}

{% endhighlight %}

Yes. Technically you are now a depositor, because you have implemented the `deposit` function as required by the Depositor interface.

Now we will make an interface that extends another interface but does not add to it.

{% highlight javascript %}

contract Depositoror is Depositor{}

{% endhighlight %}

Here is the implementation

{% highlight javascript %}

contract DepImpl is Depositoror {
  function deposit(uint amount) {}
}

{% endhighlight %}

The `DepImpl` contract will compile, and it will work exactly like `OkButNowIAm`. Next we're going to create an interface that extends two other interfaces.

{% highlight javascript %}

contract Depositor {
  function deposit(uint amount) returns (bool);
}

contract Withdrawer {
  function withdraw(uint amount) returns (bool);
}

contract BankUser is Depositor, Withdrawer {}

{% endhighlight %}

Now we implement `BankUser`, create a `Bank` interface, implement that and then and combine them.

{% highlight javascript %}

// Interface for banks.
contract Bank {
  // The return values would be to indicate that the transaction was successful.
  function makeDeposit(uint amount) constant returns (bool);
  function makeWithdrawal(uint amount) constant returns (bool);
}

// Dummy implementation of 'Bank'.
contract UBS is Bank {

  function makeDeposit(uint amount) returns (bool) {
    return true;
  }

  function makeWithdrawal(uint amount) returns (bool) {
    return true;
  }
}

// Implementation of BankUser
contract ABankUser is BankUser {

  Bank bank;

  function ABankUser(){
    bank = new UBS();
  }

  function deposit(uint amount){
    bank.makeDeposit(amount);
  }

  function withdraw(uint amount){
    bank.makeWithdrawal(amount);
  }
}

{% endhighlight %}

The `ABankUser` contract keeps a reference to a `Bank` contract to do the actual depositing. `Bank` is an interface, which means that any contract that implements that interface will do. In fact, we could make this contract even more generic by allowing the bank to be set. This is valid:

{% highlight javascript %}

contract ARiskyBankUser is BankUser {

  Bank bank;

  function deposit(uint amount){
    bank.makeDeposit(amount);
  }

  function withdraw(uint amount){
    bank.makeWithdrawal(amount);
  }

  function setBank(address addr){
    this.bank = Bank(addr);
  }
}

{% endhighlight %}

It has `risky` in it because it is not safe. First of all, `bank` starts out un-initialized, which means the `deposit` and `withdraw` functions might fail. Secondly, `setBank` has an address in the method signature and there is no guarantee that this contract is a bank. Finally, of course this is generally a bad contract because it has no permissions structure. It's just a demonstration of interfaces so it shouldn't have that, but it's still worth keeping in mind.

### Events

Events are used to dump information from Solidity contract code into the blockchain clients log. It is a way of making that information available to the "outside world". On top of the events themselves, most clients also have a way of capturing this output and encapsulating it in an event data-structures. This is particularly important for efficiency between the blockchain clients and the "outside world" which will rely upon these events in order for other things to happen.

Let us look at an example. We start by adding a new function to the BankUser interface:

{% highlight javascript %}

contract BankUser is Depositor, Withdrawer {
  function complain(bytes32 complaint);
}

{% endhighlight %}

Now we implement:

{% highlight javascript %}

contract ABankUser is BankUser {

  Bank bank;

  event Complain(address indexed userAddress, bytes32 indexed complaint);

  function ABankUser(){
    bank = new UBS();
  }

  function deposit(uint amount){
    bool result = bank.makeDeposit(amount);
    if(!result){
      complain("wtf");
    }
  }

  function withdraw(uint amount){
    bool result = bank.makeWithdrawal(amount);
    if(!result){
      complain("wtf");
    }
  }

  function complain(bytes32 complaint){
    Complain(msg.sender, complaint);
  }
}

{% endhighlight %}

What will happen here is that every time a `ABankUser` contract is executed, and the `complain` method is run, it will generate an event which can be read from the log. When using a library like [Ethereum's web3](https://www.npmjs.com/package/web3), you can set up a listener for this particular event. It is very simple. Assume that the `web3` contract for a particular `ABankUser` is named `bankUser123`. To generate a filter for that event we would simply do this:

{% highlight javascript %}

var filter = bankUser123.Complain();

{% endhighlight %}

Events are included in the contracts json ABI, and by calling the corresponding javascript function you get a filter. If we want to listen to and handle events continuously we could do this:

{% highlight javascript %}

filter.watch(callbackFun(data));

function callbackFun(data){
  var args = data.args;
  eMailTheManager(args.userAddress, args.complaint);
}

{% endhighlight %}

The `args` object will have fields that are named after the indexed fields in the contract, so you can decide when making the event what each of these fields should be called, and of course their types.

Regarding types: Contracts and "interfaces" are the same. There's no special interface type. The only difference is that an interface contract is allowed by the compiler to have abstract functions in it. Also, as we have seen, it is possible to coerce a contract into a super-contract i.e. there is no need to make an explicit cast:

{% highlight javascript %}

contract A {}

contract B is A {}

contract C {
  A a;

  function C(){
    a = new B();
  }
}

{% endhighlight %}

### Converting addresses to contracts

You can convert between contracts and addresses. This for example is allowed:

{% highlight javascript %}

function setB(address addr){
  b = B(addr);
}

{% endhighlight %}

There is no way of checking what type of contract is actually at that address though - or if it's even a contract. What this means is: **A contract can pass the compiler type checks but still be of the wrong type. Also, this is very hard to detect.**

Consider this:

{% highlight javascript %}

contract Greeter {
  function greet() returns (bytes32) {
    return "Hello!";
  }
}

contract Test {
  Greeter greeter;

  function setGreeter(address addr) {
    // Notice this is a cast, not instantiation.
    greeter = Greeter(addr);
  }

  function callGreeter() returns (bytes32) {
    return greeter.greet();
  }
}

contract Tester {
  Test t;
  bytes32 msg;

  function Tester(){
    t = new Test();
    Greeter greeter = new Greeter();
    t.setGreeter(address(greeter));
    msg = t.callGreeter();
  }
}

{% endhighlight %}

This compiles, and we can check to see that `Tester` has "Hello!" written into its `msg` field; however, if we change the constructor of `Tester` into passing its own address to `Test` - `t.setGreeter(address(this))` - it will still compile, but it will not function correctly. The reason is of course that the address we pass to `setGreeter` is not the address of a `Greeter`. When we call `Test.callGreeter`, the data will be properly formatted and a call will be made to the address of `Greeter`, but the receiving contract is a `Tester`, and thus it has no idea how to handle it.

One way of circumventing this is to only allow contracts to be added in very controlled ways, for example through dedicated factories or through methods that only certain accounts are allowed to access, but it is something that needs to be done with care.

### Briefly about errors

There is no real error handling system in Solidity (yet). There are no `try - catch` or `throw` statements, or something to that effect. A lot of operations that throw errors or exceptions in most other languages does not, like for example division by zero (check the [yellow paper](http://gavwood.com/Paper.pdf) (PDF link)).

Contract designers need to deal with errors themself. Solidity does some sanity checks on arrays and such, but will often respond simply by executing the `(STOP)` instruction. According to the developers, this is just put in as a placeholder until a more sophisticated error handling and recovery system is put in place.

Being that Solidity and the EVM both are under development, I believe that sticking to a few good principles is best for now. I usually handle exceptions manually and keep a list of error codes that are passed back to the caller. This is different depending on the type of function, but generally:

If the function is a getter, return null value(s) in case of failure, and perhaps complement the return values with an error code.

If the function is not constant, return an error code.

The error code for of normal execution (in both cases) is always `0`.
