---

layout: docs
title: "Tutorials | Making a Permissioned Chain - Eris v0.10.*"

---

It is not necessarily a simple matter to "make" a permissioned chain. With the `eris` tooling, we make it as simple as possible, but it does take a bit of crafting to get everything correctly sorted.

This tutorial is structured to walk individuals through parts of the eris developer tool kit while also showing readers how to make a permissioned blockchain. Note, during the course of this tutorial, the chain we will create is suitable for pilots iterating toward production, it is a bit more complicated than a simple local chain one only needs for testing simple contracts out in a solo environment. To do that just use the very simple and straightforward:

```
eris chains new my_chain
```

And you'll be set up. This tutorial, on the other hand is made to walk through a (slightly) more complex permissioned chain.

**Note** -- This tutorial is built for Eris v0.10. For other versions of this tutorial please see below:

* [v0.11](/tutorials/chainmaking/)

# Introduction

There are roughly three steps to making a permissioned blockchain:

1. Make (or Get) the public addresses for the individuals
2. Make the genesis.csv
3. Instantiate the blockchain

We shall go through these in their logical order.

## Users Design

To do this we need to, first, consider, *who* will get *what* permissions and *why*. It is outside the scope of this tutorial to outline all of the considerations which would come into play when thinking about creating a permissioning system, but for the purposes of this tutorial, we will craft the genesis block to use the following paradigm:

* Administrators (these would be developers who had **full** control over the chain)
* Validators (these will be set up as cloud instances and they will **only** be given validation permissions)
* Participants (these will have permissions to create contracts, and do most of the stuff necessary on the chain)

For the purposes of this tutorial, we will have (1) administrator, (5) validators, and (20) participants. This will require a total of 26 keys, and all of their specifics to be generated and added to the genesis block.

## A Note Regarding This Tutorial

The `eris` toolchain is designed to be very unix like, and as such we are able to craft most of what is needed in simple bash scripts which any competant developer should be able to understand. Bash really, truly, is the common demoninator as it does not require any specialized language specific knowledge beyond a bare minimum to understand what is happening.

For this tutorial, we have kept the bash scripting to a bare minimum, but should you have any questions regarding any of the bash scripting, please let us know on our [Support Forums](https://support.erisindustries.com) and we will endeavor to make more clear what any commands that are unclear are actually doing.

# Step 1. Make (or Get) the Public Addresses

Everyone who interacts with an eris:db blockchain will need to have a properly formated keypair. To make a keypair we will use a combination of `eris-keys` and `mintkey`. Neither of these will need to be installed on your machine if you already have the eris-cli [installed](/tutorials/getting-started).

For this tutorial, we will be using these tools from "inside" their containers.

`eris-keys` usually operates as a signing daemon, but when we use eris-keys to *create* key pairs what we are doing effectively is writing files. As is usual with the eris tooling, `eris-keys` is opinionated and will work by default against the following directory: `~/.eris/keys/data`. When a key pair is created, that key pair will get written into that directory.

When we are using containers, these containers are not built to *hold* data, but rather are built to hold what is needed to run processes. But, if we're making keypairs, then we definitely want to *keep* these.

Usually the eris tooling holds data inside special containers, but for the purposes of what we're trying to accomplish, that is not the default behaviour we would like to see. Instead we would like to have the keypairs reside on the host where they can be backed-up and dealt with as normal files on the hard drive. Sometimes when docker gets overloaded we will perform various "cleaning" type actions which could accidentally remove data containers and that would have adverse consequences, especially if we have running chains. So to do this, we will use a paradigm called *mounting a volume*. This will take a directory from the host and *mount* it as a directory within the container. So whenever the container process writes to this directory it will be saved in the directory on the host.

So to accomplish this, use the docker porcelain to "get inside" the keys image:

```
docker run -it --rm -v ~/.eris/keys:/home/eris/.eris/keys quay.io/eris/keys /bin/bash
```

Let's break that command down, step by step. First `docker run` tells docker we're gonna run. Then the `-it` flag is for the `interactive` and `tty` flags which basically "give us a terminal". The `--rm` flag tells docker to remove the container when we're done with it. The `-v ...` flag with the directories tells docker to mount the volume in the appropriate location. The `eris/keys` tells docker to make and start a container based off of the `eris/keys` image. And, finally, the `/bin/bash` tells docker "what command to run" (in this case, bash).

Basically that will drop us "inside a container" which has all of the tooling we need to work with key creation.

Once we are inside the container, we need to start the keys daemon:

```
eris-keys server &
```

Now we're ready to go. To see what are options are let us first see what our options are:

```
eris-keys -h
```

The help screen will give us the appropriate commands for what we are trying to accomplish, which in this case is to `generate` a key. Now let us see the help screen for `gen`

```
eris-keys gen -h
```

Right. Will all of that help looked at, let's make a key.

```
eris-keys gen
```

That will ask you for a password which you should use. Then it will output a string of part of the public key. Now, for the purposes of this tutorial **only** we will also create all of the necesary keys for all of the "users" of the chain and we will do so without passwords. Again, this is for demonstration purposes only, for a production system you will not do what we're about to do.


```bash
chain_dir=~/.eris/keys/tmp
mkdir $chain_dir
eris-keys gen --no-pass > $chain_dir/admin_addr
fin=4
for ((i=0;i<=fin;i++)); do
  eris-keys gen --no-pass >> $chain_dir/val_addr
done
fin=19
for ((i=0;i<=fin;i++)); do
  eris-keys gen --no-pass >> $chain_dir/part_addr
done
```

If you open another terminal and type:

```
ls ~/.eris/keys/data
```

You should now see (on the host machine) a bunch of folders in that location, one of them with with the same string that was outputed by the generate command.

So that's it, we're done with this container, so let's exit (and it should be removed by docker).

```
exit
```

Now these keys need to be made ready for eris:db to use. Now we need to "get inside" of a container which is based on the quay.io/eris/erisdb image.

```
docker run -it --rm -v ~/.eris/keys:/home/eris/.eris/keys quay.io/eris/erisdb /bin/bash
```

Note that here the docker porcelain command is almost exactly the same, with the exception that we're using the erisdb image. At this time, eris:db is structured to use Tendermint style keys. This means that we're going to have to use `mintkey` to translate the eris-keys (which are semi-generic in nature) into the proper format for eris:db to use.

**Temporary Hack** if you get errors during the next portion of the tutorial instead of using the normal `qauy.io/eris/erisdb` image use the 0.10.4 image by adding `:0.10.4` to the end of the image portion of the docker command.

First let's save the correct key string to use into a few variables.

```bash
chain_dir=~/.eris/keys/tmp
admin_key=$(cat $chain_dir/admin_addr)
vals_key=($(cat $chain_dir/val_addr))
participant_key=($(cat $chain_dir/part_addr))
```

Now, with that done we are ready to translate the eris-keys into a format which can be consumed by eris:db.

```bash
mintkey mint $admin_key > ~/.eris/keys/tmp/priv_validator.json
admin_addr=$(mintkey mint $admin_key | jq '.pub_key[1]' | sed -e 's/^"//'  -e 's/"$//' )
declare -a vals_addr
declare -a participant_addr
fin=4
for ((i=0;i<=fin;i++)); do
  vals_addr[$i]=$(mintkey mint ${vals_key[$i]} | jq '.pub_key[1]' | sed -e 's/^"//'  -e 's/"$//' )
done
fin=19
for ((i=0;i<=fin;i++)); do
  participant_addr[$i]=$(mintkey mint ${participant_key[$i]} | jq '.pub_key[1]' | sed -e 's/^"//'  -e 's/"$//' )
done
```

Note, for the above, we are not making priv_validator.json files for *all* of the participants since this is only a demonstrator tutorial. Ideally, each participant would create their own key and send the address to the administrator who was creating the blockchain.

# Step 2. Make the genesis.csv

Having all of the public key addresses, we're ready to start making the .csv files which will be used to Instantiate the blockchain in Step 3.

To see all of the possible permissions use the following command:

```
mintperms all
```

All of the names may not make total sense to you, but our documentation will improve to capture what each of these does (in the meantime, feel free to ask us on our [support forums](https://support.erisindustries.com); the more times we get questions, the higher we'll prioritize the documentation here).

Right, so let's set up our `permissions` and `set bits` as shell variables:

```bash
perms_admin=$(mintperms all | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $1}')
setbt_admin=$(mintperms all | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $2}')
perms_part=$(mintperms int root:0 send:1 call:1 create_contract:1 create_account:1 bond:0 name:1 | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $1}')
setbt_part=$(mintperms int root:0 send:1 call:1 create_contract:1 create_account:1 bond:0 name:1 | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $2}')
perms_vals=$(mintperms int root:0 send:0 call:0 create_contract:0 create_account:0 bond:1 name:0 | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $1}')
setbt_vals=$(mintperms int root:0 send:0 call:0 create_contract:0 create_account:0 bond:1 name:0 | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $2}')
```

Now for these permissions what we're doing is we are saving as variables the permissions and the SetBit for each of the "types" of users of this particular chain.

You can see what each of these is by `echo $perms_part` or whatever variable you'd like to see.

Also, when you are ready to make your own chain, you should change the permissions to whatever makes sense for your particular chain.

Now that we have the permissions, we should consider whether each user will be given tokens or not. For the purposes of this tutorial, we'll just give everyone tons of tokens and save it as a shell variable.

```bash
tokens="2251799813685248"
```

Finally, we'll want to set up an identifier schema so we can remember who is who. For the purposes of this tutorial we'll just use the chain name and then we'll iterate each of the users accordingly (this will make sense in a second, so please bear with us). We'll also add some convenience functions to the shell to ease the generation process going forward.

```bash
chain_name="idiaminchain"
chain_dir=~/.eris/keys/tmp
write_line() {
  echo "$1","$2","$3","$4","$5" >> $chain_dir/accounts.csv
}
write_line_vals() {
  echo "$1","$2","$3","$4","$5" >> $chain_dir/validators.csv
}
```

Right. Now we are ready to make our two csv files. But, wait, what in the world?

So to create an eris:db chain we generally have two "sections" to the chain. One which will create accounts, and one which will create validators. These will then both be used down the road. We could create these as one genesis.csv but that can get confusing where we have some users who will simply "use" the chain and others who will act as validators so at eris we tend to keep these in two separate csv files rather than as one.

One thing to note is that for the purposes of the rest of this, we will assume that you have saved the public key addresses generated in Step 1 as variables (which should be easy enough to figure out). If you were hand crafting this creation process rather than scripting it, then you would enter these one by one on the command line.

```bash
write_line $admin_addr $tokens "$chain_name"_admin $perms_admin $setbt_admin
fin=4
for ((i=0;i<=fin;i++)); do
  # write the lines for the validators to the validator and accounts csv's
  write_line ${vals_addr[$i]} $tokens ""$chain_name"_val_0"$i"" $perms_vals $setbt_vals
  write_line_vals ${vals_addr[$i]} $tokens ""$chain_name"_val_0"$i"" $perms_vals $setbt_vals
done
```

Now, the above requires a *bit* of shell scripting knowledge to understand what is happening. First, we create one admin for the chain. Normally you'd want more admins than just one, but for the purposes of this we've just created one.

Second we have created the validators. It has been assumed that the public key addresses were saved into an `vals_addr` array of the same length as the number of validators.

Now to create the participants:

```bash
fin=19
for ((i=0;i<=fin;i++)); do
  # write the lines for the participants to the accounts csv
  write_line ${participant_addr[$i]} $tokens ""$chain_name"_participant_0"$i"" $perms_part $setbt_part
done
```

Once we have gone through the above, then we should have "everybody accounted for"!

# Step 3. Instantiate the Blockchain

With the csv's filled out we're ready to rock and roll.

To create a genesis block we use a different mint-client tool, the `mintgen` tool. This tool will generate a genesis block based on a csv or other variables. To see a bit about the mintgen tool, type:

```
mintgen -h
```

We will be using the `known` command. So first, take a look at the help for this:

```
mintgen known -h
```

**Temporary hack**: eris:db has changed from previously using sub-millisecond time to now only using second based time. This is because javascript is unable to parse sub-second time. But currently, mintgen outputs a genesis block with sub-second time added. We will need to "zero" that out by using the `jq` tool which is in the eris:db container.

```bash
mintgen known --csv=$chain_dir/validators.csv,$chain_dir/accounts.csv $chain_name > $chain_dir/genesis.json.bak
jq '.genesis_time = "'$(jq '.genesis_time' $chain_dir/genesis.json.bak | sed -e 's/\.[[:digit:]][[:digit:]][[:digit:]]Z/.000Z/' | tr -d '"')'"' $chain_dir/genesis.json.bak > $chain_dir/genesis.json
```

And with that, we have a shiny genesis.json. To see the genesis.json,

```bash
cat $chain_dir/genesis.json
```

This genesis.json, along with the priv_validator.json is what will be given to `eris chains new` in a second. But first we need to leave the container...

```
exit
```

Now that we're back on our machine, lets move the tmp folder we used into a more approriate location.

```
mv ~/.eris/keys/tmp ~/.eris/blockchains/idiaminchain
```

If you look inside that directory you should see a genesis.json, a few csv files (which, now that we have the full genesis.json, are no longer needed), and one (or more) priv_validator.json files. The two files we'll need to get rolling with the chain are the genesis.json and the priv_validator.json files.

```
eris chains new idiaminchain --genesis ~/.eris/blockchains/idiaminchain/genesis.json --priv ~/.eris/blockchains/idiaminchain/priv_validator.json
```

Boom. You're all set with your custom built, permissioned, smart contract-ified, blockchain.

This chain won't run out of the box though. Why? Because you'll need to deploy the validators and connect them to one another. This will be the subject of [the next tutorial in this series](/tutorials/advanced/chaindeploying).

