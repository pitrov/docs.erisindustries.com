---

layout: docs
title: "Tutorials | Making a Permissioned Chain (Simple) - Eris v0.11"

---

It is not necessarily a simple matter to "make" a permissioned chain. With the `eris` tooling, we make it as simple as possible, but it does take a bit of crafting to get everything correctly sorted.

This tutorial is structured to walk individuals through parts of the eris developer tool kit while also showing readers how to make a simple permissioned blockchain.

**Note** -- This tutorial is built for Eris versions `>= 0.11.1`. For other versions of this tutorial please see below:

* [v0.10](/tutorials/deprecated/chainmaking-v0.10/)
* [v0.11.0](/tutorials/deprecated/chainmaking-v0.11.0/)

# Introduction

There are three steps to making a permissioned blockchain:

1. Make (or Get) the public keys for the individuals
2. Make the genesis.json file
3. Instantiate the blockchain

We shall go through these in their logical order.

## Users Design

To do this we need to, first, consider, *who* will get *what* permissions and *why*. It is outside the scope of this tutorial to outline all of the considerations which would come into play when thinking about creating a permissioning system, but for the purposes of this tutorial, we will craft the genesis block to use the following paradigm:

* 3 Administrators (these would be developers who have **full** control over the chain) (one of which will be "running" the chain performing validation)

If you would like to understand all of the permissions which an eris chains smart contract network is capable of providing, [please see our documentation on the subject](/documentation/eris-db-permissions/).

We use an abstraction to simplify the chain making process called [Account Types](/documentation/eris-cm/latest/account_types/). This abstraction is just that, an abstraction to help users quickly get up to speed. In order to reduce the complexity of dealing with different types of accounts typically built on a chain, we use the idea of "account types". Account types are not restrictive in the sense that they are not the "only" types of accounts you can make with eris chains.

Account types are simply bundles of permissions no more no less. Using the eris tooling you can also create your own account types with your own bundles of permissions which will be helpful.

Eris ships with a chain manager tool we typically run from a docker container. This tool helps to simplify the chain making process. To learn a bit more about this tool type:

```
eris chains make -h
```

## A Note Regarding This Tutorial

The `eris` toolchain is designed to be very unix like, and as such we are able to craft most of what is needed in simple bash scripts which any competant developer should be able to understand. Bash really, truly, is the common demoninator as it does not require any specialized language specific knowledge beyond a bare minimum to understand what is happening.

For this tutorial, we have kept the bash scripting to a bare minimum, but should you have any questions regarding any of the bash scripting, please let us know on our [Support Forums](https://support.erisindustries.com) and we will endeavor to make more clear what any commands that are unclear are actually doing.

# Steps 1. Make (or Get) the Public Keys

Everyone who interacts with an eris chains blockchain will need to have a properly formated keypair. To make a keypair we will use `eris keys`.

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

But instead of dealing with the `eris-keys` service directly, we mostly use `eris keys` from the eris cli tool. The `eris keys` commands are basically wrappers around the `eris-keys` commands which are ran inside containers. To see the wrappers which the eris cli tooling provides around the `eris-keys` daemon, please type:

```bash
eris keys -h
```

Now it is time to generate some keys!

For the purposes of this tutorial **only** we will also create all of the necesary keys for all of the "users" of the chain and we will do so without passwords. Again, this is for demonstration purposes only, for a production system you will not do what we're about to do.

```bash
eris keys gen
```

This will create one key for you. The output here should look something like this:

```irc
49CA2456F65B524BDEF50217AE539B8E10B37421
```

Now. Let's export that key onto our host's drive so that we can back it up and keep it safe in the future.

```bash
eris keys export 49CA2456F65B524BDEF50217AE539B8E10B37421
```

Note, that in the above command we used the output from the `eris keys gen` command with the `eris keys export`. You will want to replace the argument in the `export` command with whatever the address for the public key you created is.

To see the keys which eris-keys generated both *inside* the container type and available on your host machine type:

```bash
eris keys ls
```

Before we move on to actual chainmaking, if you would like to explore more of the eris keys functionality please see our [keys tutorial](/tutorials/tool-specific/keyexporting/).

Now, we're all ready to make a chain.

# Step 2. Make the genesis.json

Before we begin, we should quickly talk through the various files which are needed to run an eris chain. When you ran `eris init` during the [getting started](/tutorials/getting-started/) step, eris created a folder called `~/.eris/chains/default` on your host's hard drive. This is to hold the default files for using eris chains. There are a few primary files used by eris chains:

1. the config file for the tendermint consensus engine called `config.toml`
2. the chain definition file for eris chains called `chainName.toml` (where `chainName` is the name of your chain) (these are located in your ~/.eris/chains directory)
3. the `genesis.json` which tells eris chains how it should configure itself at the beginning of the chain (or, its genesis state)
4. the config file for the eris:db application engine called `server_conf.toml`
5. the keypair which the tendermit consensus engine will use to sign blocks, etc. called the `priv_validator.json`

In general you do not really need to mess with `server_conf.toml` unless you know what you're doing and need to move away from the default settings. Similarly, you should not need to edit `chainName.toml` unless you have a deeper understanding of docker or specific needs around how your chain will run.

The three files you *may* need to edit are the `genesis.json` and `priv_validator.json` (both of which we're about to get "made" for us) and the `config.toml`.

The `config.toml` file is generally edited to fill in the `seeds` and `moniker` fields. The `seeds` field (which is a misnomer because it accepts a string rather than an array, and as such should have been named `seed`) is used to point your consensus engine to the peer server it should connect into. For more information on how to deal with this please see our [advanced chain making tutuorial](/tutorials/advanced/chainmaking/). The `moniker` field is "your node's name on the network". It should be unique on the given network.

The `genesis.json` is the primary file which tells eris chains how to instantiate a particular blockchain. It provides the "genesis" state of the blockchain including the accounts, permissions, and validators which will be used at the beginning of the chain. These can always be updated over the life of the chain of course, but the genesis.json provides the starting point. Luckily `eris` takes care of making this for you and there is very little which should be required for you in way of editing (unless you know what you're doing of course, in which case why are you reading this ;-) ).

With all that said, we're ready to make a chain. First let us make a "fake" chain just to get a tour of the chain maker tool. Once we go through that process then we will make our "real" chain which we will use for the rest of this tutorial series. Let's see what eris chains make can do for us.

```bash
eris chains make -h
```

That will give you an overview of the chains maker tool. Now we are ready.

```bash
eris chains make toRemoveLater
```

This will drop you into an interactive, command line wizard. Follow the text and the prompts to chain making bliss. Since we're going to throw this chain away later you can just press "Enter" at each of the prompts or you can change the variables and get a feel for the wizard.

Once the wizard exits let's take a look at what was created:

```bash
ls ~/.eris/chains/toRemoveLater
```

You should see three `*.csv` files and a bunch of directories. Let's look in one of those directories:

```bash
ls ~/.eris/chains/toRemoveLater/toremovelater_full_000
```

In that directory you should see a genesis.json and a priv_validator.json. The marmots call these a "bundle" as generally they are what is needed to get a chain going (in addition to a config.toml which with the proper seed and moniker filled out).

What about those `csv` files? There should be three of them. Let's take a look:

```bash
cat ~/.eris/chains/toRemoveLater/accounts.csv
cat ~/.eris/chains/toRemoveLater/validators.csv
cat ~/.eris/chains/toRemoveLater/addresses.csv
```

The first two files can be used later to create a new genesis.json if the actual json gets lost. One of the things about this tooling is that it **creates** the keys for you. That is helpful in some circumstances. In other circumstances this is not helpful.

In general, we recommend that if you are making a chain for a consortium that you have your consortium members **make their own keys** and then send the public key to you. Once you've assembled the keys then you will create an accounts.csv and validators.csv files in this format and then run `eris chains make` with the `--known` flag. More information on complex chain making is included in our [advanced chain making tutorial](/tutorials/advanced/chainmaking/).

The last file is the `addresses.csv` file which is another artifact of the chain making process. It simply has the addresses and the "names" of the nodes. We find it useful when scripting out complex interactions and it is simply a reference file along the lines of `addr=$(cat $chain_dir/addresses.csv | grep $name | cut -d ',' -f 1)`.

Now. Let's remove all those directories that were created and see how we can use these csv files to create a new set genesis.json.

```bash
cd ~/.eris/chains/toRemoveLater
rm -rf ~/.eris/chains/toRemoveLater/toremovelater*
ls ~/.eris/chains/toRemoveLater
```

Now you should only have the csv files. So let's make a new genesis.json:

```bash
eris chains make --known --validators validators.csv --accounts accounts.csv toRemoveLater
```

That command will display a genesis.json which you can pipe into a file if you needed. Since we already had the keys on the current keys container it also remade all of the bundles for us. You can check them with the ls commands.

OK, enough playing around let's get serious!

```bash
cd ~/.eris/chains
rm -rf ~/.eris/chains/toRemoveLater
```

That command will remove all of the stuff we've been working on. Per the above and after our review of the account types, we know we want to have two Root account types and one Full account type for our new chain. So let's get to business.

```bash
chain_dir=$HOME/.eris/chains/simplechain
chain_dir_this=$chain_dir/simplechain_full_000
```

That will just create a few variables we'll be using in the future.

```bash
eris chains make --account-types=Root:2,Full:1 simplechain
```

**Troubleshooting**

If you get an error which looks like this:

```irc
API error (404): lstat /var/lib/docker/aufs/mnt/e1e4f7063ced2456109aacf85f62f73685631a59d2c3d86907edf52e86a6f45d/home/eris/.eris/chains/account-types: no such file or directory
```

That means that you have an old eris/data image. Fix it with:

```bash
docker pull quay.io/eris/data
```

<hr />

If you get a 500 error which looks like this:

```irc
API error (500): Cannot start container eris_interactive_eris_service_htest_1: Cannot link to a non running container: /eris_service_keys_1 AS /eris_interactive_eris_service_htest_1/keys`
```

That means that you have an old eris/keys image. Fix it with:

```bash
docker pull quay.io/eris/keys
```

**End Troubleshooting**

That's it! Let's double check the files to make sure we are squared away.

```bash
ls $chain_dir
ls $chain_dir_this
```

# Step 3. Instantiate the Blockchain

With all the files prepared we're ready to rock and roll.

```bash
eris chains new simplechain --dir $chain_dir_this
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

**Next, you'll want to [deploy some contracts](/tutorials/contractsdeploying/)!**

Or, perhaps you'll want to go [make a more advanced permission chain](/tutorials/advanced/chainmaking/).


