---

layout: docs
title: "Tutorials | Solidity 5"

---


## Part V: Modular design and strategies

**Note**: Solidity is still under heavy development, which means running the actual code is hard, and since it's on dev it cannot be assumed to be stable.

### Introduction

This post is about how we can divide contracts up into components. By creating smart contracts from a set of specialized super-contracts, it becomes easier to manage them, test them, and to build on previously written code. The focus here will be on something I refer to as "strategy contracts". It is a more or less direct application of the strategy pattern, and while it doesn't really introduce anything new it is in my opinion a good way to think about the components that makes up a (non-trivial) contract.

### owned and mortal

We're going to start with basic permissions. This is something I've written about before, and I used the same contracts. In the [Solidity standard library](https://github.com/ethereum/wiki/wiki/Solidity-standard-library#contracts), you will find these two contracts called `owned` and `mortal`.  The point of the `owned` is to provide a simple basis for access control, because a contract that extends `owned` will get the `address owner` field, which is automatically set to `msg.sender` in the constructor (so the address of the account that creates the contract). It also provides a modifier which can be added to a function in order to check if the caller of the function is the owner.

To start with, we're going to make a few changes to the contracts.

owned:
{% highlight javascript %}
contract owned{

    function owned() {
        owner = msg.sender;
    }

    function isOwner() constant returns (bool) {
        return msg.sender == owner;
    }

    address owner;
}
{% endhighlight %}

mortal:
{% highlight javascript %}
import "owned";

contract mortal is owned {

    function kill() {
        if (isOwner()){
            suicide(owner);
        }
    }
}
{% endhighlight %}

Through the rules of inheritance (which is very similar to how it works in C++), `mortal` now has all the fields and function of `owned`, and when it is instantiated it will automatically call the constructor of `owned` which will set the `owner` field. It can also call `isOwner` to do the owner check. Also, if `mortal` is extended by another contract, that contract will have a `kill()` function that suicides the contract and can only be called by the contract creator (which is what the `mortal` contract is for).

Finally, a very simple [unit-testing contract](/tutorials/solidity/solidity-4/) could be written for `owned` to ensure that it does indeed work:

{% highlight javascript %}

contract failer {

    owned od;

    function failer(address _od){
        od = owned(_od);
    }

    function isOwner() constant returns (bool){
        return od.isOwner();
    }
}

// Simple contract creates 'owneds' and make sure it works. Returns success or failure through a boolean.
contract ownedTest {

    function testIsOwner() returns (bool) {
        // Owner should be set to the address of this contract.
        var od = new owned();
        return od.isOwner();
    }

    function testIsOwnerFail() returns (bool) {
        // Sets owner to address of this contract.
        var od = new owned();
        failer fr = new failer(od);
        // Should fail, because 'fr' gets its own address, and that address is
        // not the same as the address of this contract.
        return !fr.isOwner();
    }

}
{% endhighlight %}

### Strategies

The `owned` and `mortal` contracts are useful, but very limited in their scope. In most systems we would not be happy with this arrangement, but would rather want a more flexible system for deciding who gets to do what, or in other words: we would want a different permission strategy. Regardless of what that strategy is, though, it should still have a number of properties in common with `owned`. For example, if we change the no-argument `isOwner` function to `isAdmin`, and change the fields, we should be able to create similar contracts that use the same basis, but implement different strategies for managing (single account) access control. Here is one way of creating the same basic system, but allows for two different access-control strategies:

{% highlight javascript %}
// Basic authentication contract is abstract. Unlike 'owned' it also has an overloaded version that takes a param.
contract Auth {
    function isAdmin(address addr) constant returns (bool);
    function isAdmin() constant returns (bool);
}
{% endhighlight %}

{% highlight javascript %}
// Single account authentication keeps one authorized user (the admin), implements the checks and also
// allows the admin to be changed (though only by the current admin).
// Notice that 'admin' field is never set.
contract SingleAccountAuth is Auth {

    address public admin;

    function isAdmin(address addr) constant returns (bool) {
        return addr == admin;
    }

    function isAdmin() constant returns (bool){
        return msg.sender == admin;
    }

    function setAdmin(address addr) constant returns (bool) {
        if (isAdmin()){
            admin = addr;
            return true;
        }
        return false;
    }

}
{% endhighlight %}

{% highlight javascript %}
// Fully implemented - takes the admin address as a constructor param.
contract AdminAuth is SingleAccountAuth {

    function AdminAuth(address _admin){
        admin = _admin;
    }

}
{% endhighlight %}

{% highlight javascript %}
// Fully implemented - sets creator as admin (just like 'owned').
contract CreatorAuth is SingleAccountAuth {

    function CreatorAuth(){
        admin = msg.sender;
    }

}
{% endhighlight %}

Now we have two contracts to choose from. If we want the admin to be the creator we extend `CreatorAuth`, and if we want to pass the admin address in as a constructor param (which can be useful for example when the sub-contracts are generated by a factory), we use `AdminAuth`.

It's important to notice that these strategies are not fully interchangeable because their constructors are different, and unlike in other languages we would sometimes use inheritance rather then composition, which is mostly a temporary solution until some more language features has been added, or one that is used for efficiency. An "ideal" contract would perhaps take an 'Auth' (or 'SingleAccountAuth') contract instance as a constructor param and use that. It could look something like this:

{% highlight javascript %}
contract Mortal is Auth {

    Auth auth;

    function Mortal(address _auth){
        auth = Auth(_auth);
    }

    function kill() {
        if (auth.isAdmin()){
            suicide(msg.sender);
        }
    }
}
{% endhighlight %}

### Testing

The point of strategies is not just to provide a convenient toolbox that allows strategies to be mixed and matched, it also makes testing easier. If you do a proper unit-test of each of the different strategies, then the sub-contract tests can use that. For example, this is a [sol-unit](https://github.com/androlo/sol-unit) test for `AdminAuth` (don't mind the assertion code):

{% highlight javascript %}
contract AdminAuthTest is Asserter {

    function testIsAdmin(){
        AdminAuth aa = new AdminAuth(address(this));
        assertTrue(aa.isAdmin(), "sender is not admin");
    }

    function testIsAdminWithParam(){
        AdminAuth aa = new AdminAuth(address(this));
        assertTrue(aa.isAdmin(address(this)), "addr is not admin");
    }

    function testIsAdminWithParamFail(){
        AdminAuth aa = new AdminAuth(address(this));
        assertFalse(aa.isAdmin(address(0x12345)), "wrong addr is admin");
    }

    function testSetAdmin(){
        AdminAuth aa = new AdminAuth(address(this));
        var res = aa.setAdmin(0x55);
        assertAddressesEqual(aa.admin(), 0x55, "admin was not set");
    }
}
{% endhighlight %}

### Extending

In most systems you'd want more sophisticated access control; for example, you might want to allow multiple accounts to be admins and not just one. In that case you could still use the `Auth` interface, but the `SingleAccountAuth` contract would no longer be useful. This would be implemented in the same way it would in most other code. Maybe you want to make a `MultiAccountAuth` contract and branch off, or perhaps separate the address management logic from the authentication altogether, and have a separate interface for that (i.e. address management is itself a strategy for authentication contracts). There are many possible solutions.

### Conclusion

The combination of abstract (interface) contracts with inheritance makes it possible to encode different strategies/solutions to the same problem into separate contracts that all use a common interface. Doing so makes the code re-usable, clean, and easy to test. This applies to the strategy contracts themselves but also to the contracts that uses them.

Finally, some general advice for beginners - A lot of this is harder then it may sound because of how young Solidity still is, but planned features such as shared contracts and templated structs will gradually make it easier. Also, Solidity will still go through many changes (some of them breaking), so whatever code is written today will probably not compile in a few months or so (or will at least have to be refactored). It will likely continue like this for some time. At this point it is best to start simple, and to continue to keep it simple.