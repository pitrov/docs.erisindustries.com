---

layout: content
title: "Tutorials | Deploying your Permissioned Chain"

---

Deploying and connecting your permissioned chains is not as difficult as [making a permissioned chain](../chainmaking), but it does require some careful work. This tutorial will cover the basics of deploying and connecting your blockchain nodes.

This tutorial is a continuation of the previous tutorial on making a permissed chain, so if you have not gone through that tutorial, then please do so before working through this tutorial.

# Introduction

In general what is going to happen here is that we are going to establish what we at Eris call a "peer sergeant major" node who is responsible for being the easy connection point for any nodes which need to connect into the system. While we understand that decentralized purists will not like the single point of failure, at this point it is the most viable way to orchestrate a blockchain network.

In addition to the one "peer sergeant major" we will also deploy four "peer sergeants" who will be cloud based validator nodes. For the purposes of this tutorial we will be using DigitalOcean droplets and [docker-machine](https://docs.docker.com/machine/) to create these cloud instances and to deploy the blockchains onto the droplets.

Of course it is not essential for you to use DigitalOcean, docker-machine works well with a variety of public and private cloud providers / management systems. Indeed, you don't even need docker-machine if you have docker and eris installed on the machine and you are able to ssh into the machine.

The reason why the cloud provider + docker-machine paradigm is interesting is that it is capable of provisioning nodes, starting, stopping, restarting nodes, and automating the docker connection from your local machine. This means, functionally, that one can be working from a laptop and in one command connect and deploy docker containers without having to ssh into the boxes or do very much at all (bear with us and we'll show you how it works over the course of this tutorial).

You can also use Virtualbox to run the validator nodes entire only your laptop if you wish.

## A Note Regarding This Tutorial

The `eris` toolchain is designed to be very unix like, and as such we are able to craft most of what is needed in simple bash scripts which any competant developer should be able to understand. Bash really, truly, is the common demoninator as it does not require any specialized language specific knowledge beyond a bare minimum to understand what is happening.

For this tutorial, we have kept the bash scripting to a bare minimum, but should you have any questions regarding any of the bash scripting, please let us know on our [Support Forums](https://support.erisindustries.com) and we will endeavor to make more clear what any commands that are unclear are actually doing.

## Dependencies

Please install docker-machine. If you are on OSX or Windows and have installed Docker Toolbox per Eris' [getting started tutorial](../getting-started) then you will have docker-machine installed for you. If you are on Linux, please see the [docker-machine installation instructions](https://docs.docker.com/machine/install-machine/) to get yourself setup.

You can test your installation with:

```
docker-machine --version
```

**ProTip** set an alias for docker-machine in your appropriate shell file, `~/.bashrc`, `~/.zshrc`, etc. (whichever is appropriate for your shell) with:

```bash
alias dm="docker-machine"
```

Reload your shell and you'll be all set up. For the purposes of this tutorial, we'll be using the full `docker-machine` rather than an alias, but most of us at Eris have some sort of alias set up as we use docker-machine quite a lot.

The second thing we will need to do is to acquire a Digital Ocean API key. Please log into to your DigitalOcean account and [go here](https://cloud.digitalocean.com/settings/applications). If you do not have a DigitalOcean account and instead prefer to use AWS, Rackspace, or another cloud provider then you will need to see the [docker-machine documentation for that cloud provider](https://docs.docker.com/machine/drivers/) to properly craft the `docker-machine create` commands we are about to embark upon.

## Overview of Tutorial

In general we are going to take three steps in order to get the chain setup:

1. Create the peer machines we will be using
2. Deploy the chain to each machine using `eris`
3. Connect into the chain locally

# Step 1. Create the Peer Machines

One of the greatest things about docker-machine is how easy it makes it to provision cloud instances on our behalf. Let's see how this works. docker-machine has a `ton` of options in order to create a new machine. Check it out with:

```
docker-machine create -h
```

But we don't need to worry too much about all of those options. We just want to focus on the digital ocean ones. So let's use a bit of shell magic to do the filtering for use:

```bash
docker-machine create -h | grep digital
```

Now. That's better. Much easier to see what we're looking at. Ready or not, let's create a droplet.

```bash
TOKEN=YOUR_TOKEN_FROM_DIGITAL_OCEAN
docker-machine create --driver digitalocean \
  --digitalocean-access-token $TOKEN \
  --digitalocean-region ams3 \
  idiaminchain-psm
```

Now let's break that down. The first thing we do is to save our digital ocean API key into a shell variable. Then we launch the create command. We use the `--driver` flag to tell docker-machine to deal with Digital Ocean, then we add our API key. Then we tell it to use the Digital Ocean data center named `ams3`. You can find the appropriate Digital Ocean data center list in their documentation. Finally, we give the machine a name. We have chosen to name it after the chain name and `psm` (for peer sergeant major). This machine will act as in the capacity described above for the peer sergeant major.

Now to create the four other peer sergeants.

```bash
docker-machine create --driver digitalocean \
  --digitalocean-access-token $TOKEN \
  --digitalocean-region fra1 \
  idiaminchain-ps1
docker-machine create --driver digitalocean \
  --digitalocean-access-token $TOKEN \
  --digitalocean-region sgp1 \
  idiaminchain-ps2
docker-machine create --driver digitalocean \
  --digitalocean-access-token $TOKEN \
  --digitalocean-region tor1 \
  idiaminchain-ps3
docker-machine create --driver digitalocean \
  --digitalocean-access-token $TOKEN \
  --digitalocean-region sfo1 \
  idiaminchain-ps4
```

What's happening here is that essentially we're just repeating the same command as for the peer sergeant major four times to create the other nodes with two notable differences. First we are putting these in different data centers around the world (mix and match data centers however makes sense for your application); second we are changing the names of the machines from peer sergeant major to peer sergeant 1, peer sergeant 2, etc.

OK. Now our peer machines are all set up.

# Step 2. Deploy the Chain to Each Machine

Now that we have our machines created we're ready to deploy the chain. Although a bit outside of the scope of this tutorial, you will need to create `priv_validator.json` files for each of the peer sergeants and the peer sergeant major. For more on how to create these files see [the chain making tutorial](../chainmaking), but to review the basic command we use is:

```bash
eris keys convert $addr > priv_validator.json
```

Create five directories in your `~/.eris/chains` folder (Note, on Eris < 0.11 this was the `~/.eris/blockchains` folder). Call them the same thing as the docker-machine name. Then copy the genesis.json we created in the previous tutorial into each of the five directories as well as the *unique* priv_validator.json which matches the appropriate key for that validator into the folder. Now we're going to need to change the config.toml files.

```bash
cd ~/.eris/chains/idiaminchain-psm
cp ../default/server_conf.toml .
cp ../default/config.toml .
```

Repeat the above for each of the directories. One thing we need to get is the ip address of the peer sergeant major (the `idiaminchain-psm` node). We can do this with a very simple command:

```
docker-machine ip idiaminchain-psm
```

Please copy that to your clipboard or remember it somehow because we are about to need it. Now we will want to update each of these files in the text editor of our choice slightly. Open up the five config.toml files and change the following lines

```toml
moniker = "idiaminchain-ps1"
seeds = "IP:46656"
```

For each of the nodes, peer sergeant master, peer sergeant 2, etc., you'll want to change the `ps1` in the above to match the node name (so, `idiaminchain-ps1`, etc.). You'll want to replace `IP` in the above with the appropriate ip address you retrieved from the  `docker-machine ip` command. When you're editing the config file for the peer sergeant major you can leave the seeds to be an empty string. So that config.toml lines should look like this:

```toml
moniker = "idiaminchain-psm"
seeds = ""
```

### For `eris` < 0.11.0

Finally, we want to change one last file, the chain definition file.

```bash
eris chains edit $chain_name
```

That command will allow you to edit the chain definition file. Change the ports line (or add it if it does not exist) to the `[service]` section:

```toml
ports = [ "1337:1337", "46656:46656", "46657:46657" ]
```

### For all `eris` versions

What that will do is to `publish` the ports from the container to the host on the same exact port. In `eris` >= 0.11.0 this is done automatically for you. Understanding the ports is important for distributed software for this reason. If the blockchains *think* they are running on port X, but that port is exposed to the internet as port Y when they are doing their advertising to their peers they will be saying, "Hey, I'm located on IP address Z on port X". But the problem is that from the internet's perspective they should really be saying "Hey, I'm located on IP address Z on port Y". So at Eris we routinely recommend that you simply "flow through" the ports rather than trying to do anything funky here.

One thing to watch if you hard code the ports which the host machine will expose is that you will need to have these be unique for each chain so you will either only be able to run one chain per node or you'll need to use different ports for the other chain.

Once that is complete, we're ready to deploy the chains.

Deploying your chain to a specific machine with eris is pretty simple.

```bash
eris chains new --dir $chain_dir --api $chain_name --machine $machine_name
```

You'll need to replace `$chain_dir` in the above with the appropriate directory you created in ~/.eris/chains (e.g., ~/.eris/chains/idiaminchain-psm, etc.) (you only need the part after the ~/.eris/chains, so `idiaminchain-psm` or whatever), where `$chain_name` is the name of the chain you are using, so `idiaminchain` and where `$machine_name` is the name of the machine which should be deployed to.

# Step 3. Connect Into The Chain Locally

Now we need to connect into the chain from our local nodes now that the cloud based validator nodes are all set up. The first thing we need to do as with the peer sergeant nodes, is to edit the config.toml. If you followed the [chain making tutorial](../chainmaking) then you will have the `admin` priv_validator.json and the genesis.json already located in ~/.eris/chains/idiaminchain. So, let's use those to get connected to the chain locally. First, edit the config file ~/.eris/chains/idiaminchain/config.toml. As wil the peer sergeants, we'll use the IP address of the peer sergeant major to perform the initial "check in" with the peers. After that, the peers will handle gossiping who's currently "hanging out".

```toml
moniker = "idiaminchain-admin"
seeds = "IP:46656"
```

The moniker, for the record, needs to be unique on the network but can be whatever string you'd like it to be.

Now we should change back the ports we "hard coded" in the chain definition file. So use `eris chains edit $chain_name` and remove the ports line to revert back to the default.

Now with that done, we have to get the chain rolling locally. That will take some time.

```bash
eris chains new --dir $chain_name --api $chain_name
```

Check that it is running:

```bash
eris chains ls
```

And see what its doing:

```bash
eris chains logs $chain_name
```

Oh wait. That didn't take long at all. Now you're all set up. Connected up to custom built, permissioned smart contract network with cloud based validators, given yourself admin permissions, and in what essentially has boiled down to move a few files around, edit a few lines in a few config files, and enter a few commands, we're ready to build out our applications.

**Protip**: remove those Digital Ocean droplets when you're done with them using:

```bash
docker-machine rm idiaminchain-psm
docker-machine rm idiaminchain-ps1
docker-machine rm idiaminchain-ps2
docker-machine rm idiaminchain-ps3
docker-machine rm idiaminchain-ps4
```

{% image idiamin.jpg %}