---

layout: content
title: "Tutorials | Making a Permissioned Chain (Simple) - Eris v0.11"

---

It is not necessarily a simple matter to "make" a permissioned chain. With the `eris` tooling, we make it as simple as possible, but it does take a bit of crafting to get everything correctly sorted.

This tutorial is structured to walk individuals through parts of the eris developer tool kit while also showing readers how to make a simple permissioned blockchain.

**Note** -- This tutorial is built for Eris versions >= 0.11. For other versions of this tutorial please see below:

* [v0.10](../deprecated/chainmaking-v0.10/)

# Introduction

There are three steps to making a permissioned blockchain:

1. Make (or Get) the public keys for the individuals
2. Make the genesis.json file
3. Instantiate the blockchain

We shall go through these in their logical order.

## Users Design

To do this we need to, first, consider, *who* will get *what* permissions and *why*. It is outside the scope of this tutorial to outline all of the considerations which would come into play when thinking about creating a [permissioning system](/documentation/eris-db-permissions/), but for the purposes of this tutorial, we will craft the genesis block to use the following paradigm:

* 3 Administrators (these would be developers who had **full** control over the chain) (one of which will be "running" the chain performing validation)

If you would like to understand all of the permissions which an eris:db smart contract network is capable of providing, [please see our documentation on the subject](/documentation/eris-db-permissions/).

To see more about how we typically design chains for proofs of concept you can see [this deck](http://www.slideshare.net/CaseyKuhlman/eris-industries-typical-account-types).

## A Note Regarding This Tutorial

The `eris` toolchain is designed to be very unix like, and as such we are able to craft most of what is needed in simple bash scripts which any competant developer should be able to understand. Bash really, truly, is the common demoninator as it does not require any specialized language specific knowledge beyond a bare minimum to understand what is happening.

For this tutorial, we have kept the bash scripting to a bare minimum, but should you have any questions regarding any of the bash scripting, please let us know on our [Support Forums](https://support.erisindustries.com) and we will endeavor to make more clear what any commands that are unclear are actually doing.

# Step 1. Make (or Get) the Public Keys

Everyone who interacts with an eris:db blockchain will need to have a properly formated keypair. To make a keypair we will use `eris keys`.

`eris keys` usually operates as a signing daemon, but when we use eris keys to *create* key pairs what we are doing effectively is writing files. As is usual with the eris tooling, `eris keys` is opinionated and will work by default against the following directory: `~/.eris/keys/data`. When a key pair is created, that key pair will get written into that directory.

Because we use Docker to take out most of the edge cases with various operating systems and simplify the development environment for our users, these files will be written to a file system located inside the eris keys container. As we go through this tutorial we will explain a bit about what that means. When we are using containers, these containers are not built to *hold* data, but rather are built to hold what is needed to run processes. But, if we're making keypairs, then we definitely want to *keep* these.

To accomplish this, we will use use the `eris` tooling only. First we need to start the eris-keys daemon:

```bash
eris services start keys
```

By default, `eris` is a very "quiet" tool. To check that the keys service started correctly type:

```bash
eris services ls
```

To see what we can do with eris keys we will run:

```bash
eris services exec keys "eris-keys -h"
```

What this is doing is running the `eris-keys -h` "inside" the keys containers. Technically it is not inside the keys container, but inside a separate container based on the keys image with the data container mounted, but if this sentence doesn't make sense to you then feel free to ignore.

But instead of dealing with the `eris-keys` service directly, we are going to use `eris keys` from the eris cli tool. To see the wrappers which the eris cli tooling provides around the `eris-keys` daemon, please type:

```bash
eris keys -h
```

Now it is time to generate some keys!

For the purposes of this tutorial **only** we will also create all of the necesary keys for all of the "users" of the chain and we will do so without passwords. Again, this is for demonstration purposes only, for a production system you will not do what we're about to do.


```bash
chain_dir=~/.eris/chains/simplechain
mkdir $chain_dir
eris keys gen > $chain_dir/addr1
eris keys gen > $chain_dir/addr2
eris keys gen > $chain_dir/addr3
```

This will create a three keys. Let's check that the addresses got saved into `$chain_dir`.

```bash
cat $chain_dir/addr1
```

The output here should look something like this:

```irc
49CA2456F65B524BDEF50217AE539B8E10B37421
```

You will want to do the same for `addr2` and `addr3` to make sure they also are all sorted.

To see the keys which eris-keys generated *inside* the container type:

```bash
eris actions do keys list
```

`eris actions` are simplified bash scripts which operate similar to how continuous integration yamls typically operate. In the default actions we provide a handy action saved until `keys_list.toml` which can be "ran" with the above command. This action will display all the keys available to your eris-keys signing container.

Now is a good time to export these keys to your host's hard drive, meaning to copy them from the container onto your "normal" hard drive so that if you accidentally remove your keys' data container that the keys will be backed up somewhere. To export your keys please see our [keys tutorial](../tool-specific/keyexporting/).

There are two more things we will need to do before we move on.

First, we need to have the public key for the keypair we will be using for the validator. We will be using `addr1` for the validator node, but you could replace this with whatever you wanted. This is fairly easy:

```bash
eris keys pub $(cat $chain_dir/addr1) > $chain_dir/pub_key
```

Make sure this is OK:

```bash
cat $chain_dir/pub_key
```

The output should look something like this:

```bash
A03590C401A26947971F9E7B18C006B8C1AE4319089AB072BC9E46D4B9723714
```

Obviously, because you'll have different keys you'll have a different string there.

Finally, we will want to export the priv_validator.json which eris:db will use for the validator. Again, we will be using `addr1` for the validator nodes but you can replace that with whatever you like.

```bash
eris keys convert $(cat $chain_dir/addr1) > $chain_dir/priv_validator.json
```

Check the output with:

```bash
cat $chain_dir/priv_validator.json
```

The output should look something like this:

```json
{"address":"49CA2456F65B524BDEF50217AE539B8E10B37421","pub_key":[1,"A03590C401A26947971F9E7B18C006B8C1AE4319089AB072BC9E46D4B9723714"],"priv_key":[1,"6EED5D0A9B62AB305250A7F6B821E9D2D937E932E667366E9C722A01B8D07FC1A03590C401A26947971F9E7B18C006B8C1AE4319089AB072BC9E46D4B9723714"],"last_height":0,"last_round":0,"last_step":0}
```

Now, we're all ready to go.

# Step 2. Make the genesis.json

When you ran `eris init` during the [getting started](../getting-started/) step, eris created a folder called `~/.eris/chains/default` on your host's hard drive. This is to hold the default files for using eris chains. We will now use a couple of those files as our default files so we will want to copy them into our current `$chain_dir`.

```bash
cp ~/.eris/chains/default/config.toml $chain_dir/config.toml
cp ~/.eris/chains/default/server_conf.toml $chain_dir/server_conf.toml
cp ~/.eris/chains/default/genesis.json $chain_dir/genesis.json
```

These three files are (1) the config file for the tendermint consensus engine, (2) the config file for eris:db, and (3) the genesis.json which we will shortly edit.

The genesis.json is the primary file which tells eris:db how to instantiate a particular blockchain. It provides the "genesis" state of the blockchain including the accounts, permissions, and validators which will be used at the beginning of the chain. These can always be updated over the life of the chain of course, but the genesis.json provides the starting point.

The genesis.json now needs to be edited. We'll edit this in three steps within the tutorial.

First, change the `chain_id` which should be the first field to `simple_chain`.

```json
{
  "chain_id": "simple_chain",
```

Second, we'll add in the addresses we generated and saved to addr1, addr2, and addr3 as accounts with some tokens on the chain in the accounts array of the genesis.json.

```json
"accounts": [
  {
    "address": "49CA2456F65B524BDEF50217AE539B8E10B37421",
    "amount": 690000000000
  },
  {
    "address": "E6191F8DEF96F727BB5D58CDB9021A2F1EFB32FB",
    "amount": 565000000000
  },
  {
    "address": "1FDD813D68F73BBABFEA6EF6FB83118441CFC347",
    "amount": 525000000000
  }
],
```

In the default genesis.json there are usually five accounts including a few dummy accounts we use in our test suite for eris, you can remove those and just have the three addresses you generated as the three accounts. You can give them whatever amount of tokens you want them to have (including 0).

Finally, we'll add in the validator field of the genesis.json

```json
"validators": [
  {
    "pub_key": [
      1,
      "A03590C401A26947971F9E7B18C006B8C1AE4319089AB072BC9E46D4B9723714"
    ],
    "amount": 5000000000,
    "unbond_to": [
      {
        "address": "49CA2456F65B524BDEF50217AE539B8E10B37421",
        "amount": 5000000000
      }
    ]
  }
]
```

Note, you'll want to replace the public key with the right string and the address with the correct unbonding address. You can change the amount bonded if you want, but there is usually no need to do that. If your default genesis.json has more validators than just the one, you can safely delete them from *this* genesis.json that you are currently editing them as we will only be using one validator for this chain.

Now we are all set with our genesis.json. You may want to use a [JSON linter](http://jsonlint.com/) to make sure that the JSON is properly formatted, else eris:db will be unable to read it and you may have errors if, for example, you missed a comma where it should have been or had one where it shouldn't have been.

# Step 3. Instantiate the Blockchain

With the genesis.json filled out we're ready to rock and roll.

```bash
eris chains new simplechain --dir $chain_dir
```

Check that the chain is running with:

```bash
eris chains ls
```

To see the logs of the chain:

```bash
eris chains logs simplechain
```

To turn off the chain:

```bash
eris chains stop simplechain
```

Boom. You're all set with your custom built, permissioned, smart contract-ified, blockchain.

# Where to next?

**Next, you'll want to [deploy some contracts](../contractsdeploying/)!**

Or, perhaps you'll want to go [make a more advanced permission chain](../advanced/chainmaking/).


