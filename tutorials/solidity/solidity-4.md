---

layout: content
title: "Tutorials | Solidity 4"

---


## Part IV: Solid Solidity

**Note**: Solidity is still under heavy development, which means running the actual code is hard, and since it's on dev it cannot be assumed to be stable.

**Note (2)**: A working example of the solUnit version of the test-contract can be found [here](https://github.com/androlo/sol-unit/blob/master/contracts/src/CoinTest.sol).

### Introduction

This post and the following ones will be about validating smart contracts; making sure that they do what they are designed to do, and that they continue to do so.

Blockchains and smart-contracts are great, and it's all fantastic, but as we are about to release the second iteration of our system, and Ethereum is releasing a live [Frontier](https://ethereum.org/) version, things are starting to get more serious. For that reason, the focus in these posts will shift. It'll be less about what we *can* do, and more about what (I believe) we *should* do.

### Testing smart-contracts

The topics of this and the coming posts will mostly be smart contract testing, building and CI. In this one we're going to do some tests using a simple Coin/Bank contract as an example. This particular contract can also be found in the official [Solidity tutorial](https://github.com/ethereum/wiki/wiki/Solidity-Tutorial#subcurrency-example).


{% highlight javascript %}
contract Coin {
    address minter;
    mapping (address => uint) balances;

    event Send(address from, address to, uint value);

    function Coin() {
        minter = msg.sender;
    }

    function mint(address owner, uint amount) {
        if (msg.sender != minter) return;
        balances[owner] += amount;
    }

    function send(address receiver, uint amount) {
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Send(msg.sender, receiver, amount);
    }

    function queryBalance(address addr) constant returns (uint balance) {
        return balances[addr];
    }
}
{% endhighlight %}

There are two fields in this contract - `minter` and `balance`. `minter` is an address, and `balances` is a mapping between addresses and (unsigned) integers.

`minter` is set in the constructor (the `Coin()` function). The only account that is allowed to create new coins is the account with address equal to `minter`.

To mint new coins, the `minter` may call the `mint` function. It takes the target account and amount as input.

Regular users may use the `send` function to transfer coins from their account to others, or `queryBalance` to get the balance of an account.

### Unit tests

We're going to start by testing this contract through other contracts, so as to isolate the contract functionality from everything else (blockchain transaction infrastructure etc). There are many ways to divide tests up. I tend to divide them into different "tiers".

1. The first tier of tests is contract-to-contract. It involves creating a test-contract that calls the "testee" contract and processes the results. Any test-accounts that are needed would be created inside the test contracts.

2. The second tier would be creating a number of different accounts (through the blockchain client), deploy the contract, and use the test-accounts to transact with the contract. These accounts would all be on the same machine, using the same node.

3. The third tier would be setting accounts up on different machines, and do the transactions over the net.

The logic behind this is simple - if the third tier of tests fail, it may be due to network issues, or bugs in the API we use to make transactions, or the parameters we send, or the calling code itself, or of course the contracts. It is easy to figure out which by moving down the ladder.

If the second tier of tests fails, it could be due to all of the above except for networking issues, so by running these tests we know that if the third tier fails and the second tier passes, it's most definitely a networking issue.

If the second tier of tests fails, but the first tier passes, it could be any of the above except networking issues or issues with the calling code/blockchain API.

If the first tier fails, then it could still be due to a number of different things. Tier 1 tests could certainly fail for other reasons then bugs in the target contract. It could be that the chain is not properly set up. It could be that the unit tests are bad. It could be that the transaction sent to the test-contract doesn't work. There are other things as well. One way of eliminating some unknowns would be to use a proper unit-testing framework.

#### A unit-testing framework

A unit-testing framework would do a number of different things:

1. It would ensure that tests are always written using the same format.

2. It would ensure that anything preventing the actual tests from being run is properly reported before hand.

3. It would ensure that errors/exceptions that happen during the tests are properly reported.

4. All of the above would be standardized - and there would be tests to ensure that the framework itself is working.

Unfortunately, there is no such framework in place yet. I am working on one called [solUnit](https://github.com/androlo/sol-unit) (a.k.a. sUnit) for our `eris-db` system that I use myself. It is written in node.js javascript. It is still fairly early in development, and I don't presume that others will adopt it, but I will still use it as an example.

Now lets get to work.

### Coin test-cases

First - in this case we have a contract, and we're going to test it. We're not starting from a conceptual model; the code is already in front of us. Our mission here is simply to test the `Coin` contract to make sure it works as intended. In order to do so, we will consider a number of different test-cases and design a test for each one.

#### Minting

The rules for minting is rather simple - the contract creator becomes the minter, and only the minter is allowed to endow user accounts with coin. The first rule is encoded in the constructor, and the second one in the `mint` function.

**Test 1:** Check that the contract creator does indeed become the minter.

**Test 2:** Check that the minter can mint coins.

**Test 3:** Ensure that only the minter can mint coins.

#### Transferring coin

The rules for transacting is simple as well - any account can send and receive coin. The only restriction is that an account cannot send more coins then it has. There is no target check - accounts are not created, instead a non existent account is the same as an account with balance 0. Also, accounts are allowed to send coins to themselves.

**Test 1:** Check that an account can transfer coins.

**Test 2:** Check that an account cannot send more coins then it has.

### Implementing the tests

We will start with as simple a format as possible. There will be a test contract with a function for each unit test, which returns `false` if it fails, or `true` if it passes.

We will start by doing three small modifications to the `Coin` contract.

1. Set `minter` to `public`, so that we can get the address of the minter.

2. Set `balances` to public, instead of making a separate function for it.

3. Remove the `Send` event. There is no way to check whether or not an event was actually fired from within a contract, so it will not be useful here.

This is the version of the `Coin` contract that we'll be working with:

{% highlight javascript %}
contract Coin {
    address public minter;
    mapping (address => uint) public balances;

    function Coin() {
        minter = msg.sender;
    }

    function mint(address owner, uint amount) {
        if (msg.sender != minter) return;
        balances[owner] += amount;
    }

    function send(address receiver, uint amount) {
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }

}
{% endhighlight %}

Here is the list of tests again:

**Test 1:** Check that the contract creator does indeed become the minter.

**Test 2:** Check that the minter is allowed to mint coins.

**Test 3:** Ensure that the only the minter is allow to mint coins.

**Test 4:** Check that an account can transfer coin to an account.

**Test 5:** Check that an account cannot send more coins then it has.

This is the testing contract. We're not gonna mock anything, so some of the tests are a bit awkward, but that doesn't matter.

{% highlight javascript %}

// Used to interact with the coin contract.
contract CoinAgent {

  // Reference to the coin contract.
  Coin coin;

  // These contracts will be handed the reference to the coin contract by the test contract.
  function CoinAgent(address coinAddress){
    coin = Coin(coinAddress);
  }

  // Call 'mint' on coin.
  function mint(address owner, uint amount) {
    coin.mint(owner, amount);
  }

  // Call 'send' on coin.
  function send(address receiver, uint amount) external {
    coin.send(receiver, amount);
  }
}

contract CoinTest {

    // Create a new instance of the 'Coin' contract.
    Coin coin = new Coin();

    // Create a couple of agents.
    CoinAgent minterAgent = new CoinAgent(coin);
    CoinAgent senderAgent = new CoinAgent(coin);
    CoinAgent receiverAgent = new CoinAgent(coin);
    CoinAgent sendFailerAgent = new CoinAgent(coin);
  CoinAgent receiveFailerAgent = new CoinAgent(coin);

    // Gonna use this as a default value for coins.
    uint constant COINS = 5;

    // Test 1 - Are we the minter?
    function testIsMinter() external returns (bool passed) {
        // We created the coin contract, and should therefore be the minter.
        // Use the public accessor for 'minter' to check.
        var minter = coin.minter();
        passed = minter == address(this);
    }

    // Test 2 - Can we mint?
  function testMinting() external returns (bool passed) {
    var myAddr = address(this);
    // Mint some coins and send them to ourselves.
    coin.mint(myAddr, COINS);
    var myBalance = coin.balances(myAddr);
    passed = myBalance == COINS;
  }

  // Test 3 - Can non-minters mint?
  function testMintingWhenNotMinter() external returns (bool passed) {
    // Use 'minterAgent' which has a different address.
    var minterAddr = address(minterAgent);
    minterAgent.mint(minterAddr, COINS);
    var minterBalance = coin.balances(minterAddr);
    passed = minterBalance == 0;
  }

  // Test 4 - Can coins be sent?
  function testSending() external returns (bool passed) {
    var senderAddr = address(senderAgent);
    var receiverAddr = address(receiverAgent);

    // Mint and pass to sender.
    coin.mint(senderAddr, COINS);
    // Transfer from sender to receiver.
    senderAgent.send(receiverAddr, COINS);
    // Check the receivers balance.
    var receiverBalance = coin.balances(receiverAddr);
    passed = receiverBalance == COINS;
  }

  // Test 5 - Can coins be sent even if balance is too low?
  function testSendingWithBalanceTooLow() external returns (bool passed) {
    var sendFailerAddr = address(sendFailerAgent);
    var receiveFailerAddr = address(receiveFailerAgent);
    // Send
    sendFailerAgent.send(receiveFailerAddr, COINS);
    // Check the receiveFailers balance.
    var receiveFailerBalance = coin.balances(receiveFailerAddr);
    passed = receiveFailerBalance == 0;
  }

}
{% endhighlight %}

These tests should show that the contract generally works as intended. Again - these aren't proper unit tests, so test 4 could fail for example because minting doesn't work. We could find out if that's the case by looking at the result of test 2, but that in turn could fail because the setting of the minter doesn't work, which we would have to use test 1 to determine.

There's not much we can do about this though, since the contract is what it is - but that observation itself is good. When we design a similar contract we can keep that in mind, and perhaps allow minter strategy to be passed in using DI (shared contracts will be good in that respect), and do other modifications as well. Of course, the `Coin` contract is not supposed to be anything but a super-simple Solidity example, so nothing is really wrong here.

### A solUnit test.

The test above is fine, but it lacks a number of features. What if I want to do more then one assertion per test method. What if I want standardized assertion methods. What if I want to communicate the results in the form of Solidity events? What if I would like to do some basic coverage analysis? It would have to be added in by the person doing the test, and could get messy.

The [solUnit](https://github.com/androlo/sol-unit) framework has support for all those things. Using its assertions library, this is what the test-contract would look like:

{% highlight javascript %}
contract CoinTest is Asserter {

    // Create a new instance of the 'Coin' contract.
    Coin coin = new Coin();

    // Create a couple of agents.
    CoinAgent minterAgent = new CoinAgent(coin);
    CoinAgent senderAgent = new CoinAgent(coin);
    CoinAgent receiverAgent = new CoinAgent(coin);
    CoinAgent sendFailerAgent = new CoinAgent(coin);
  CoinAgent receiveFailerAgent = new CoinAgent(coin);

    // Gonna use this as a default value for coins.
    uint constant COINS = 5;

    // Test 1 - Are we the minter?
    function testIsMinter() {
        // We created the coin contract, and should therefore be the minter.
        // Use the public accessor for 'minter' to check.
        var minter = coin.minter();

        assertAddressesEqual(minter, address(this), "TestContract is not minter");
    }

    // Test 2 - Can we mint?
  function testMinting() {
    var myAddr = address(this);

    assertAddressesEqual(coin.minter(), address(this), "TestContract is not minter");

    // Mint some coins and send them to ourselves.
    coin.mint(myAddr, COINS);
    var myBalance = coin.balances(myAddr);

    assertUintsEqual(myBalance, COINS, "minter balance is wrong");
  }

  // Test 3 - Can non-minters mint?
  function testMintingWhenNotMinter() {
    // Use 'minterAgent' which has a different address.
    var minterAddr = address(minterAgent);
    minterAgent.mint(minterAddr, COINS);
    var minterBalance = coin.balances(minterAddr);

    assertUintsEqual(minterBalance, 0, "minter balance is not 0");
  }

  // Test 4 - Can coins be sent?
  function testSending() {
    var senderAddr = address(senderAgent);
    var receiverAddr = address(receiverAgent);
    // Mint and pass to sender.
    coin.mint(senderAddr, COINS);

    assertUintsEqual(coins.balance(senderAddr), COINS, "minting failed");

    // Transfer from sender to receiver.
    senderAgent.send(receiverAddress, COINS);
    // Check the receivers balance.
    var receiverBalance = coin.balances(receiverAddr);

    assertUintsEqual(receiverBalance, COINS, "receiver balance is wrong");
  }

  // Test 5 - Can coins be sent even if balance is too low?
  function testSendingWithBalanceTooLow() {
    var sendFailerAddr = address(sendFailerAgent);
    var receiveFailerAddr = address(receiveFailerAgent);
    sendFailerAgent.send(receiveFailerAddress, COINS);
    // Check the receiveFailers balance.
    var receiveFailerBalance = coin.balances(receiveFailerAddr);

    assertUintsEqual(receiveFailerBalance, 0, "receiver was sent coins");
  }

}
{% endhighlight %}

The biggest difference is that it uses an event to communicate the results back to the test-runner, although you cannot see it here because it's automatically called in the assertion methods. This is what the output looks for this particular test:

{% highlight sh %}
Running tests for:  CoinTest

Starting: CoinTest
Deploying contract.

Running 'testMintingWhenNotMinter'
'testMintingWhenNotMinter' - PASSED
Running 'testSendingWithBalanceTooLow'
'testSendingWithBalanceTooLow' - PASSED
Running 'testMinting'
'testMinting' - PASSED
Running 'testSending'
'testSending' - PASSED
Running 'testIsMinter'
'testIsMinter' - PASSED

Test results:
*** All tests PASSED ***

Coverage report:
Coverage: 100 %
Covered methods:
minter
balances
mint
send

Results: 5 tests out 5 succeeded.

{% endhighlight %}

Coverage is a way of checking which of the methods in the "testee" contract are actually being invoked during the tests - and it can be done to check how extensive the tests are. If coverage is low, then a lot of the contracts functionality is not even used in the tests.

I should add that solUnits coverage report is not 100% definite proof. The way it works is basically that the code (AST) is analyzed, and for each invocation of a target method it back-tracks to see if the call-chain originates from a test-function, but in combination with the actual tests it is extremely strong evidence that the function is indeed being called (provided there are no bugs in the library code...). This as opposed to using a VM hook to determine that function X in contract Y is indeed being executed, which will be added in later.

The full, working version of this contract (including Asserter.sol and other things) can be found [here](https://github.com/androlo/sol-unit/blob/master/contracts/src/CoinTest.sol).

### Conclusion

Proper tests for smart-contracts will soon become the standard. This means real, well-designed, multi-level tests and not just some crappy javascript calling some function then checking the return value; however, unit testing is not all. Another thing I believe that a serious Solidity project should have is a proper workspace, with the files laid out as they would in any other code project, and a clear system for building and deploying. I think libraries like [mix](https://github.com/ethereum/wiki/wiki/Mix:-The-DApp-IDE) helps with that.

Javascript is good. It has become the de facto language not just for the web, but DApps as well. Support was added to `AlethZero` early on, and it kept evolving until it became `web3.js`. The Eris stack also support javascript (`Node.js` in particular). This support includes an API for the blockchain client, and fork of the `web3.js` solidity contracts library. One of the best things with `Node.js` integration is that we get full access to its tools. [gulp](https://github.com/gulpjs/gulp) is particularly useful. It's a very popular build-automation tool that lets you create different tasks, chain them, and many other things. There's also a unit-testing framework called [mocha](https://github.com/mochajs/mocha), and a bunch of different assertion libraries. Since `solUnit` is a node.js library, it is possible to run the tests from mocha, and thereby integrating the Solidity tests with the tests of other DApp code (at least if it is `node.js` javascript).

Aside from solUnit, I also tend to use another simple library I made, which is called [gulp-smake](https://github.com/androlo/gulp-smake). It's just a simple (and half-baked) wrapper for `solc`, but it allows me to run it from a gulp-task. With a proper gulp-task for building the contracts, and one for unit-testing, and one for deploying, it is possible to chain all of them together so that the deploy-task is preceeded by the test-task, which is in turn preceded by the build-task. If either of them fail, everything stops.

In the next post I will be making a simple multi-agent test in Javascript. The way it'll work is I will make a simple `CoinAgent` class in javascript, which holds a reference to the javascript version of the`Coin` contract (created through `eris-contracts.js` - our `web3.js`-like contract system). Each of these agents would have functions to `mint` and `send`, but they would all transact to it using their own key. There will be a script which deploys a `Coin` contract, then creates a number of agents and have them run a series of transactions to make sure that it all works.

The quest for the most reliable coin contract that's ever been will probably continue in about a week or so. Happy ÐApp ÐΞV until then.