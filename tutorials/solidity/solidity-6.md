---

layout: docs
title: "Tutorials | Solidity 6"

---

## New Solidity-features

In this post we're going to look at some Solidity-features that are fairly new, tuples, memory arrays, libraries, index access/conversion between all types, and the new imports. We're also going to look at some fun weird things.

### Tuples

[Tuples](http://solidity.readthedocs.org/en/latest/control-structures.html#destructuring-assignments-and-returning-multiple-values) are fairly new, and lets you work with multiple values of (potentially) different types at the same time.

{% highlight javascript %}
contract Tuples {

  uint _anUint = 5;
  address _anAddress = 0xfaaaafafafafa;

  // Without tuple.
  function getEverything() constant returns (uint u, address a) {
    u = _anUint;
    a = _anAddress;
  }

  // Using tuple.
  function getEverythingTuple() constant returns (uint u, address a) {
    return (_anUint, _anAddress);
  }
  
  // Gets only the second item.
  function getOnlyTheAddress() constant returns (address a) {
    (, a) = getEverything();
  }
  
}
{% endhighlight %}

### Memory arrays

Dynamically sized arrays can now be allocated directly in memory.

{% highlight javascript %}
contract C {

  function f() {
    uint[] memory x = new uint[](100);
    uint[][] memory twoDim = new uint[][](20);
    for (uint i = 0; i < twoDim.length; i++)
      twoDim[i] = new uint[](30);
  }
  
}
{% endhighlight %}

There are some important restrictions though; the most important one is that they can't be re-sized. This is different from storage arrays that can be resized either by using `push`, or just change the length, e.g. `arr.length = 453;`. The reasons has to do with differences in the way storage and memory works.

### Libraries

[Libraries](http://solidity.readthedocs.org/en/latest/contracts.html#libraries) are contracts that are deployed to specific accounts, and provide code for other contracts. They enable many useful things, like attaching functions to types.

{% highlight javascript %}
library IntOps {
  function square(int self) constant returns (int) {
    return self*self;
  }
}


contract IntOpsUser {

  using IntOps for int;

  function square(int a) constant returns (int) {
    return a.square();
  }
  
}
{% endhighlight %}

It can be used with arrays.

{% highlight javascript %}
library Uints {

  function sum(uint[] storage self) constant returns (uint s) {
    for (uint i = 0; i < self.length; i++)
      s += self[i];
  }
  
  function max(uint[] storage self) constant returns (uint max){
    for (uint i = 0; i < self.length; i++) {
      var x = self[i];
      if (x > max)
        max = x;
    }
  }
  
}


contract UintsUser {

  using Uints for uint[];

  uint[] _uints;
  
  function UintsUser() {
    _uints.push(4);
    _uints.push(55);
    _uints.push(2);
  }

  function sum() constant returns (uint) {
    return _uints.sum();
  }
  
  function max() constant returns (uint) {
    return _uints.max();
  }
  
}
{% endhighlight %}

It can even be used with structs.

{% highlight javascript %}
library Ints {

  struct Pair {
    int x;
    int y;
  }

  function max(Pair storage self) constant returns (int) {
      if (self.x >= self.y)
        return self.x;
      else
        return self.y;
  }
  
}


contract IntsUser {

  using Ints for Ints.Pair;
  
  Ints.Pair _ints;
  
  function IntsUser() {
    _ints = Ints.Pair(3, -5);
  }

  function max() constant returns (int) {
    return _ints.max();
  }
  
}
{% endhighlight %}

### Index Access and Conversion

[This](https://github.com/ethereum/wiki/wiki/Solidity-Features#index-access-for-fixed-bytes-type) is brand new and hasn't made it into the online compiler yet, but since you can convert between all value-types, it means you can turn basically anything into bytes, and thus also strings.

Strings can't be accessed by index yet (unless it changed yesterday), but bytes can, and you can convert between them as shown [here](https://github.com/ethereum/dapp-bin/blob/master/library/stringUtils.sol) (notice it is also a library).

### Imports

The [new imports](https://solidity.readthedocs.org/en/latest/layout-of-source-files.html#importing-other-source-files) lets you import files like you would in JavaScript. It is also possible to add include directories in compiler commands, and to remap paths. Remapping can be very useful; especially when the code is contained in many different directories and subdirectories.

Let's say you have a 'contracts' folder with a 'src' and an 'deps' folder, and the 'deps' folder contains a number of other contracts.

```
contracts
|_src
  |_MyContract.sol
|_deps
  |_lib
    |_LibContract.sol
  |_lib2
    |_Lib2Contract.sol
```

What you could do is to write the imports in `MyContract.sol` like this:

```
import "lib/LibContract.sol";
import "lib2/Lib2Contract.sol";
```

What you do next is to add mappings in the compile command, and run it from the 'contracts' folder.

`solc .= lib=deps/lib lib2=deps/lib2 --bin -o build src/MyContract.sol`

The `.=` only means that the current directory should be included, but not remapped.

Remapping is marginally useful in a case like this, but when you start getting many folders that are spread out it will make things a lot easier.

### Weird

This will compile in the current version of the online compiler (0.2.1-fad2d4df).

{% highlight javascript %}
contract A {

    struct S {
        uint x;
    }

    S s;

    function A(uint x) {
        s.x = x;
    }

    function x() constant returns (uint) {
        return s.x;
    }
    
    function setX(uint x) {
        s.x = x;
    }

}


// Note both x, y, setX and setY works in B.
contract B is A {

    struct S {
        uint y;
    }

    S s;

    function B(uint x, uint y) A(x) {
        s.y = y;
    }

    function y() constant returns (uint) {
        return s.y;
    }
    
    function setY(uint y) {
        s.y = y;
    }

}
{% endhighlight %}

So will this:

{% highlight javascript %}
contract C {
    
    function () returns (C) {
        uint;
    }
    
}
{% endhighlight %}
