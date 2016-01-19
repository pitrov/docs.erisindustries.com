---

layout: content
title: "Tutorials | Making a Permissioned Chain (Advanced) - Eris v0.11"

---

It is not necessarily a simple matter to "make" a permissioned chain. With the `eris` tooling, we make it as simple as possible, but it does take a bit of crafting to get everything correctly sorted.

This tutorial is structured to walk individuals through parts of the eris developer tool kit while also showing readers how to make an advanced permissioned blockchain. Note, during the course of this tutorial, the chain we will create is suitable for pilots iterating toward production, it is a bit more complicated than a simple local chain one only needs for testing simple contracts out in a solo environment. To create a very simple permissioned chain suitable for quick prototyping, please see our [simple chain making tutorial](../chainmaking/).

This tutorial, on the other hand is made to walk through a (slightly) more complex permissioned chain.

**Note** -- This tutorial is built for Eris versions >= 0.11. For other versions of this tutorial please see below:

* [v0.10](../deprecated/chainmaking-v0.10/)

# Introduction

There are three steps to making a permissioned blockchain:

1. Make (or Get) the public keys for the individuals
2. Make the accounts.csv and validators.csv files
3. Instantiate the blockchain

We shall go through these in their logical order.

## Users Design

To do this we need to, first, consider, *who* will get *what* permissions and *why*. It is outside the scope of this tutorial to outline all of the considerations which would come into play when thinking about creating a [permissioning system](/documentation/eris-db-permissions/), but for the purposes of this tutorial, we will craft the genesis block to use the following paradigm:

* Administrators (these would be developers who had **full** control over the chain)
* Validators (these will be set up as cloud instances and they will **only** be given validation permissions)
* Participants (these will have permissions to create contracts, and do most of the stuff necessary on the chain)

For the purposes of this tutorial, we will have (1) administrator, (5) validators, and (20) participants. This will require a total of 26 keys, and all of their specifics to be generated and added to the genesis block.

If you would like to understand all of the permissions which an eris:db smart contract network is capable of providing, [please see our documentation on the subject](/documentation/eris-db-permissions/).

To see more about how we typically design chains for proofs of concept you can see [this deck](http://www.slideshare.net/CaseyKuhlman/eris-industries-typical-account-types).

## A Note Regarding This Tutorial

The `eris` toolchain is designed to be very unix like, and as such we are able to craft most of what is needed in simple bash scripts which any competant developer should be able to understand. Bash really, truly, is the common demoninator as it does not require any specialized language specific knowledge beyond a bare minimum to understand what is happening.

For this tutorial, we have kept the bash scripting to a bare minimum, but should you have any questions regarding any of the bash scripting, please let us know on our [Support Forums](https://support.erisindustries.com) and we will endeavor to make more clear what any commands that are unclear are actually doing.

# Step 1. Make (or Get) the Public Keys

Everyone who interacts with an eris:db blockchain will need to have a properly formated keypair. To make a keypair we will use `eris keys`.

`eris keys` usually operates as a signing daemon, but when we use eris keys to *create* key pairs what we are doing effectively is writing files. As is usual with the eris tooling, `eris keys` is opinionated and will work by default against the following directory: `~/.eris/keys/data`. When a key pair is created, that key pair will get written into that directory.

When we are using containers, these containers are not built to *hold* data, but rather are built to hold what is needed to run processes. But, if we're making keypairs, then we definitely want to *keep* these.

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

Now it is time to generate a key!

```bash
eris keys gen
```

That command will output a string which is the public address of the keypair which was generated. Now, for the purposes of this tutorial **only** we will also create all of the necesary keys for all of the "users" of the chain and we will do so without passwords. Again, this is for demonstration purposes only, for a production system you will not do what we're about to do.


```bash
chain_dir=~/.eris/chains/idiaminchain
mkdir $chain_dir
eris keys gen > $chain_dir/admin_addr
```

This will create an administrator key (which we will later give special privileges to).

```bash
fin=4
for ((i=0;i<=fin;i++)); do
  eris keys gen >> $chain_dir/val_addr
done
```

The above command will create 5 validator keys (which we will later give special privileges to). Now, finally, we'll create 20 keys for the participants in the system. Normally you would not create the keys for others, usually you would just query their public key or address; however Idi was a man who liked to take control so we're gonna follow his lead.

```bash
fin=19
for ((i=0;i<=fin;i++)); do
  eris keys gen >> $chain_dir/part_addr
done
```

To see the keys which eris-keys generated please type:

```bash
eris services exec keys "ls /home/eris/.eris/keys/data"
```

Now these keys need to be made ready for eris:db to use.

First let's save the correct key string to use into a few variables.

```bash
admin_addr=$(cat $chain_dir/admin_addr | sed -e 's/[[:space:]]//')
```

If you're on bash then do the following:

```bash
readarray vals_addrs < $chain_dir/val_addr
readarray participant_addrs < $chain_dir/part_addr
```

The above will **only work for bash**; if you're a zsh user you'll need to do the following

```bash
zmodload -ap zsh/mapfile mapfile
vals_addrs=( "${(f)mapfile[$chain_dir/val_addr]}" )
participant_addrs=( "${(f)mapfile[$chain_dir/part_addr]}" )
```

Now, with that done we are ready to translate the eris-keys into a format which can be consumed by eris:db. The first step is to get the public key and add that as a shell variable

```bash
admin_key=$(eris keys pub $admin_addr | sed -e 's/[[:space:]]//')
```

The next step in the process is to change that raw public key into a key form which can be consumable by eris:db.

```bash
eris keys convert $admin_addr > $chain_dir/priv_validator.json
```

Now we are going to do the same thing for the validator's keys.

```bash
declare -a vals_keys
fin=4
for ((i=0;i<=fin;i++)); do
  addr=$(echo ${vals_addrs[$i]} | sed -e 's/[[:space:]]//')
  vals_keys[$i]=$(eris keys pub $addr | sed -e 's/[[:space:]]//')
done
```

Finally, the participant's keys. The reason that we are "gathering" these public keys will become apparently shortly.

```bash
declare -a participant_keys
fin=19
for ((i=0;i<=fin;i++)); do
  addr=$(echo ${participant_addrs[$i]} | sed -e 's/[[:space:]]//')
  participant_keys[$i]=$(eris keys pub $addr | sed -e 's/[[:space:]]//')
done
```

Note, for the above, we are not making priv_validator.json files for *all* of the participants since this is only a demonstrator tutorial. Ideally, each participant would create their own key and send the address to the administrator who was creating the blockchain.

# Step 2. Make the genesis.csv

Having all of the public key addresses, we're ready to start making the .csv files which will be used to Instantiate the blockchain in Step 3.

First we're going to make a chain container that we can work inside by `new`-ing and then `stop`-ing a chain.

```bash
eris chains new idiaminchain
eris chains stop idiaminchain
```

To see all of the possible permissions use the following command:

```
eris chains exec -p idiaminchain mintperms all
```

Please note the `-p` in the above command. That publishes random ports. If you run a `chains exec` and get a `port is already allocated` error, then you can add the `-p` port to randomize the ports which are published to the host. This is mostly fixed but at times there could be port conflicts.

All of the names may not make total sense to you, but our documentation will improve to capture what each of these does (in the meantime, feel free to ask us on our [support forums](https://support.erisindustries.com); the more times we get questions, the higher we'll prioritize the documentation here).

Right, so let's set up our `permissions` and `set bits` as shell variables:

```bash
perms_admin=$(eris chains exec -p idiaminchain mintperms all | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $1}')
```

```bash
setbt_admin=$(eris chains exec -p idiaminchain mintperms all | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $2}')
```

```bash
perms_part=$(eris chains exec -p idiaminchain mintperms int root:0 send:1 call:1 create_contract:1 create_account:1 bond:0 name:1 | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $1}')
```

```bash
setbt_part=$(eris chains exec -p idiaminchain mintperms int root:0 send:1 call:1 create_contract:1 create_account:1 bond:0 name:1 | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $2}')
```

```bash
perms_vals=$(eris chains exec -p idiaminchain mintperms int root:0 send:0 call:0 create_contract:0 create_account:0 bond:1 name:0 | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $1}')
```

```bash
setbt_vals=$(eris chains exec -p idiaminchain mintperms int root:0 send:0 call:0 create_contract:0 create_account:0 bond:1 name:0 | grep -C 1 "(As Integers)" | tail -n 1 | awk -F ',' '{print $2}')
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
write_line $admin_key $tokens "$chain_name"_admin $perms_admin $setbt_admin
```

Now for the validators.

```bash
fin=4
for ((i=0;i<=fin;i++)); do
  # write the lines for the validators to the validator and accounts csv's
  write_line $(echo ${vals_keys[$i]} | sed -e 's/[[:space:]]//') $tokens ""$chain_name"_val_0"$i"" $perms_vals $setbt_vals
  write_line_vals $(echo ${vals_keys[$i]} | sed -e 's/[[:space:]]//') $tokens ""$chain_name"_val_0"$i"" $perms_vals $setbt_vals
done
```

Now, the above requires a *bit* of shell scripting knowledge to understand what is happening. First, we create one admin for the chain. Normally you'd want more admins than just one, but for the purposes of this we've just created one.

Second we have created the validators. It has been assumed that the public key addresses were saved into an `vals_keys` array of the same length as the number of validators.

Now to create the participants:

```bash
fin=19
for ((i=0;i<=fin;i++)); do
  # write the lines for the participants to the accounts csv
  write_line $(echo ${participant_keys[$i]} | sed -e 's/[[:space:]]//') $tokens ""$chain_name"_participant_0"$i"" $perms_part $setbt_part
done
```

Once we have gone through the above, then we should have "everybody accounted for"!

# Step 3. Instantiate the Blockchain

With the csv's filled out we're ready to rock and roll.

To create a genesis block we use a different mint-client tool, the `mintgen` tool. This tool will generate a genesis block based on a csv or other variables. To see a bit about the mintgen tool, type:

```
eris chains exec -p idiaminchain "mintgen -h"
```

We will be using the `known` command. So first, take a look at the help for this:

```
eris chains exec -p idiaminchain "mintgen known -h"
```

Now we need to stop and take a moment to talk about eris and data containers. Because Eris uses Docker's backbone to provide all of this functionality we've been enjoying without having to install any of the tooling natively. we have to learn to work *with* Docker rather than *against* Docker. And to assist you in that journey, Eris uses the concept of data containers. These are special Docker containers which are meant to "hold" data rather than to hold processes which "do stuff".

If you check your docker containers at this point with:

```bash
docker ps -a
```

You will see that you have a container which is something like `eris_data_idiaminchain_1`. What we're going to do now is to do another eris chains new, but this time we're going to give it a `--dir` flag which will then "suck up" whatever is in the host directory and "put it into" that data container.

```bash
eris chains rm --data $chain_name
eris chains new $chain_name --dir $chain_name
eris chains stop $chain_name
```

```bash
eris chains exec -p $chain_name "mintgen known --csv=/home/eris/.eris/chains/$chain_name/validators.csv,/home/eris/.eris/chains/$chain_name/accounts.csv $chain_name" > $chain_dir/genesis.json.bak
```

**N.B.**: You may get an error which looks like this:

```irc
Error - Permissions must be an integer
Container eris_interactive_eris_chain_idiaminchain_1 exited with status 1
```

If you get that error that means that your csv files have not been properly formulated. First you'll want to check them on the host with:

```bash
cat ~/.eris/chains/$chain_name/accounts.csv
```

That file should look something like this:

```csv
9B7C6F1F52400C35BE6F5CB7138304369A7DCD77,2251799813685248,idiaminchain_admin,16383,16383
049387262939D3499CB52C9D4CF1E1EB70CF84CC,2251799813685248,idiaminchain_val_00,32,127
E38899B3518EF34BFE3EA898C4D8981A7900202C,2251799813685248,idiaminchain_val_04,32,127
A0FEFEB34F8065BFC6C53926994DD98F430585C6,2251799813685248,idiaminchain_particpant_00,94,127
```

You'll also want to check the validators csv file:

```bash
cat ~/.eris/chains/$chain_name/validators.csv
```

That file should look something like this:

```csv
049387262939D3499CB52C9D4CF1E1EB70CF84CC,2251799813685248,idiaminchain_val_00,32,127
1798977C968653221907677907694FA629D30F15,2251799813685248,idiaminchain_val_01,32,127
ABF9F624E42ACB695F04301EBC7BC9B04C0D8464,2251799813685248,idiaminchain_val_02,32,127
9F2891F348AF4748386EE86A9C113CA1E5D17BC9,2251799813685248,idiaminchain_val_03,32,127
E38899B3518EF34BFE3EA898C4D8981A7900202C,2251799813685248,idiaminchain_val_04,32,127
```

If in either of these files you see lines that look like this:

```csv
,2251799813685248,idiaminchain_val_00,32,127
,2251799813685248,idiaminchain_val_01,32,127
,2251799813685248,idiaminchain_val_02,32,127
,2251799813685248,idiaminchain_val_03,32,127
,2251799813685248,idiaminchain_val_04,32,127
```

That means that your csv files are incorrectly formulated. Just make sure that you added them correctly in the above section of this tutorial.

If those files do not have lines that look like that then you may have old csv files in the data container. Check this with:

```bash
eris data exec $chain_name "cat /home/eris/.eris/chains/$chain_name/accounts.csv"
```

If everything looks correct, then you can also check the validators.csv. If the file which is `cat`ed out of the data container is not the same as the file `cat`ed from the host then you just need to reset the data container:

```bash
eris data rm $chain_name
eris chains new $chain_name --dir $chain_name
eris chains stop $chain_name
```

Now you'll be ready to rerun the `mintgen` command noted above.

**Temporary hack**: eris:db has changed from previously using sub-millisecond time to now only using second based time. This is because javascript is unable to parse sub-second time. But currently, mintgen outputs a genesis block with sub-second time added. We will need to "zero" that out by using the `jq` tool. You can equally just edit the file.

```bash
jq '.genesis_time = "'$(jq '.genesis_time' $chain_dir/genesis.json.bak | sed -e 's/\.[[:digit:]][[:digit:]][[:digit:]]Z/.000Z/' | tr -d '"')'"' $chain_dir/genesis.json.bak > $chain_dir/genesis.json
```

And with that, we have a shiny genesis.json. To see the genesis.json,

```bash
cat $chain_dir/genesis.json
```

This genesis.json, along with the priv_validator.json is what will be given to `eris chains new` in the next tutorial.

If you look inside the `$chain_dir` directory you should see a genesis.json, a few csv files (which, now that we have the full genesis.json, are no longer needed), and one (or more) priv_validator.json files. For now, let's clean up a little bit, in the next tutorial we will go through deployin gthe validator nodes to cloud instances.

```bash
eris chains rm -x $chain_name
```

Boom. You're all set with your custom built, permissioned, smart contract-ified, blockchain.

**N.B.** You will want to export your keys onto the host at this point so that you have them backed up. Please see [this tutorial](../tool-specific/keyexporting) on how to do that.

This particular chain won't run out of the box though. Why? Because you'll need to deploy the validators and connect them to one another. This will be the subject of [the next tutorial in this series](../advanced/chaindeploying).


