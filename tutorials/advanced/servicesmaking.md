---

layout: content
title: "Tutorials | Using & Making A Service"

---

This tutorial is an expanded and revised version of the now deprecated (Part 1 only) [`eris services` Walkabout](https://eng.erisindustries.com/tutorials/2015/08/05/eris-services/). We will introduce the necessary concept of launching a chain-based application as a service via the `eris` command line tool. Please see [here](https://github.com/eris-ltd/eris-cli/#install) for installation guidelines. We'll be using the [toadserver](https://github.com/eris-ltd/toadserver) - a smart contract & IPFS backed download server as an example application. This is part one in a 3 part series:

- Part 1: This tutorial: Getting started: Launching & Making a Service
- Part 2: The Toadserver in Action: Deploy Testnet & eris init
- Part 3: Deploying Smart Contracts & Managing Permissions

**Protip:** If bash scripting is your thing, check out [this test file](https://github.com/eris-ltd/toadserver/blob/master/test.sh).

We're going to set up a chain that will then have a service depend upon it. The pipeline follows, roughly, three steps: 1) get your keys sorted, 2) start a chain, 3) start the service that links to chain.

# Sort your keys

Let's boot that keys server:

```bash
$ eris services start keys
```

see it running with:

```bash
$ eris services ls --running
```

Before making a key, we'll set some environment variables to make life easier along the way. We set the chain name and directory then make the directory for contents that will soon be copied into chain data (docker) container. The next few steps involve piping files into $CHAIN_DIR.

```
$ CHAIN_NAME=toadserver
$ CHAIN_DIR=$HOME/.eris/chains/$CHAIN_NAME
$ mkdir $CHAIN_DIR
```

Let's fill up that dir!

## Make a key

```bash
$ ADDR=$(eris keys gen)
```
This step does two things: 1) generates a key inside the data container and 2) sets the address of the key as an environment variable needed for later steps. Run: `$ echo $ADDR` to see your address. Check that you key is in the container with:

```
$ eris actions do keys list
```

## Get the pub key

```bash
$ PUB=$(eris keys pub $ADDR)
```

We're going to need the pubkey for a later step. Run: `$ echo $PUB` to see it. `$ADDR` is a hash of `$PUB`

## Export to host

Since our private key is still in the keys data container, let's export to the host since we'll need it for the next step:

```bash
$ eris keys export $ADDR
```

To check that it was exported, run:

```
$ ls $HOME/.eris/keys/data
```

**Protip:** You can also `$ eris keys import $ADDR` to go from host to container. Similiarly to `$ eris data import/export` these commands are thought of from the point of view of the container. See [this tutorial](../tool-specific/keyexporting/) for more information on the `eris keys` command.

## Convert your key

This next command makes a priv validator in the tendermint format needed to boot a chain. (Note: this step will soon be deprecated in favour of adding the pubkey to the config file.) Let's pipe it to the chain diectoryr and give it its file name:

```bash
$ eris keys convert $ADDR > $CHAIN_DIR/priv_validator.json
```

## Make the genesis file

Because what's a chain without a genesis file? The genesis file specifies accounts, validators, amounts, and permissions. A handful of defaults are set for you. We also need to pipe it in to the chain directory.

```bash
$ eris chains make-genesis $CHAIN_NAME $PUB > $CHAIN_DIR/genesis.json
```

## Get the config file

The config file specifies some variables for the node on which the chain is to be run. Perhaps you want to change the moniker to something more relevant. It is merely a name for your node and need not equal `$CHAIN_NAME`.

```bash
$ cp $HOME/.eris/chains/default/config.toml $CHAIN_DIR/
```
Now we have everything set up; you should have each a config.toml, priv_validator.json, and genesis.json in `$CHAIN_DIR`. The address and pubkey of the latter two files should match. Yes? Ok, let's roll.

# Start your chain

```bash
$ eris chains new $CHAIN_NAME --dir $CHAIN_DIR
```

This creates and starts a new chain while copying the contents of `$CHAIN_DIR` into the chain data container.
Maybe you want to chattier output to see what's going on under the hood? Add `--verbose` to the above command. When reporting bugs, always include `--debug` level output. See the following: 1) running chain, 2) logs and, 3), genesis file with each command:

```bash
$ eris chains ls --running
$ eris chains logs $CHAIN_NAME
$ eris chains plop $CHAIN_NAME genesis
```

All endpoints are available via `http://HostIP:46657`. You can see a sample [here](http://pinkpenguin.interblock.io:46657). Notice a few things for your chain:
 - `/genesis` should be nearly identical to `$CHAIN_DIR/genesis.json`;
 - `/list_validators` should show the same info as your key (pubkey/addr).
 - `/list_names` to see name registry entries. See below.
 - `/net_info` can be refreshed and block height should increase. This is also true of log output.

# Boot up toadserver

Your chain is now setup and ready to be used as a dependency for the toadserver. (Note: this process is still a WIP and will be smoother in future releases). Since we'll be launching the toadserver as a service, we need two things: 1) its docker image and 2) a service definition file (which specifies how to run the toadserver). The former is already built for you using this [Dockerfile](https://github.com/eris-ltd/toadserver/blob/master/Dockerfile) and is specified in the definition file at this line: `image = "quay.io/eris/toadserver:latest"`. The image will automatically be pulled from quay if not found locally when the toadserver is started (if you answer yes to the prompt). Alternatively, you can build it locally from the Dockerfile. See way below for more info on that.

## Get the service definition file

The service definition file for the toadserver can be got in a few ways: a) directly from the toadserver, b) from github or, c) by rerunning `$ eris init`.  The former two options are accomplished like so:

```
$ curl -X GET https://raw.githubusercontent.com/eris-ltd/eris-services/master/toadserver.toml -o $HOME/.eris/services/toadserver.toml

$ curl -X GET http://ipfs.erisbootstrap.sexy:11113/getfile/toadserver.toml -o $HOME/.eris/services/toadserver.toml
```

Check that it exists as a service with `$ eris services ls --known`

## Edit some variables
Open the file (`$ eris services edit toadserver`) and replace the following environment variables with the values from above.

```bash
"MINTX_CHAINID=$CHAIN_NAME",
"MINTX_PUBKEY=$PUB",
```

It should now look like this (but with your pubkey from $PUB):

```bash
"MINTX_CHAINID=toadserver",
"MINTX_PUBKEY=162ECE7A10260292CC562921725154193FA41C791AF4B2F2324687BF43C2107D",
```

## Start toadserver

The `--chain` flag will link the toadserver to a named chain, provided it is running.

```bash
$ eris services start toadserver --chain=$CHAIN_NAME
```

See what's going on with each:

```bash
$ eris services ls --running
$ eris services logs toadserver
```

Two things happened: If IPFS was not already running as a service, the toadserver started it. If it was already running, the toadserver would have simply linked to it (a la docker). With IPFS running, `eris files` is also available to you. Both the chain and keys containers were also linked to the toadserver. These are used under the hood by the next commands. Notice the toadserver has a port exposed at `11113`. Let's see what we can do with it. First, make or pick a file in your current working directory (e.g., `hungryToad.txt`) that you'd like to add. Then run:

```bash
$ curl -X POST http://0.0.0.0:11113/postfile/hungryToad.txt --data-binary "@hungryToad.txt"
```

where `hungryToad.txt` is the name you want entered in the name registry (i.e, the name by which you'll retreive the file) and `"@hungryToad.txt"` is the file name in your current working directory.

You should now have a name registry on your chain. Head to your `http://HostIP:46657/list_names` and you'll see the entry which should look like:

```
{"jsonrpc":"2.0","id":"","result":[11,{"block_height":1224,"names":[{"name":"hungryToad.txt","owner":"CFAE357E4EA39A5CC72EADE597108D3C296057D8","data":"QmeBXhokamuGjUzvEf9vLhTT5Nzb9mboGRig8az7DFm9GC","expires":12908}]}],"error":""}
```

Now you have a download server whereby anyone can download files. The file is retreivable in a few different ways:

To save it locally, run:
```bash
$ curl -X GET http://HostIP:11113/getfile/hungryToad.txt -o hungryToad.txt
```
or view it in the browser at the URL given above, or see it from IPFS at:

`http://gateway.ipfs.io/ipfs/HASH` where HASH is the unquoted value from "data" in the previous json output.

If your toadserver service flames out for whatever reason, you can `$ eris services restart toadserver` and be on your merry way. Happy hopping!

That's it. A simple app with two endpoints for adding and retrieving files that uses a chain to retrieve the file by name via IPFS hash. Next, I'll describe what is needed to actually build the service we've just started.

# Building a Service
There are four steps to making a service: 1) write app, 2) write Dockerfile, 3) build docker image (from Dockerfile), and 4) make a new service (write service definition file). The toadserver code is [here](https://github.com/eris-ltd/toadserver) and as you can see it's only a few hundred lines of code. Its Dockerfile is below, as is its service definition file. The image is hosted on [quay.io](https://quay.io/repository/eris/toadserver). You can also use [DockerHub](https://hub.docker.com/) for your images.

## Dockerfile & Build Image

The toadserver Dockerfile looks like this:

```
FROM quay.io/eris/base
MAINTAINER Eris Industries <support@erisindustries.com>

ENV NAME         toadserver
ENV REPO 	 eris-ltd/$NAME
ENV BRANCH       master
ENV BINARY_PATH  $NAME
ENV CLONE_PATH   $GOPATH/src/github.com/$REPO
ENV INSTALL_PATH $INSTALL_BASE/$NAME

RUN mkdir -p $CLONE_PATH
RUN git clone -q https://github.com/$REPO $CLONE_PATH
RUN git checkout -q $BRANCH
RUN go install

USER $USER
WORKDIR $ERIS

VOLUME $ERIS
EXPOSE 11113
CMD ["toadserver"]
```

Let's walk through it step by step. The first command `FROM` specifies a base image. There are tons of pre-built images out there to fit your specific needs. We've built a custom `eris/base` image that has all the niceties we'd like access to (e.g., go, git, a bunch of dependencies). Set a `MAINTAINER` if you'd like. Then we set a handful of environment variables that will be used when executing the `RUN` commands. These should be ordered as one would go about installing your application. Here, the repo is cloned then installed. `CMD ["toadserver"]` tells docker how to boot the app once installed. `USER`, `WORKDIR` and, `VOLUME` all take an `ENV` variable given in `quay.io/eris/base`  and `EXPOSE` specifies the port(s) for your application.

You can see all of eris' Dockerfiles [here](https://github.com/eris-ltd/common/tree/master/docker). For more information on writing Dockefiles, see [here](https://docs.docker.com/engine/reference/builder/).

Now that we have a Dockerfile (in current working directory), it's time to build the image:

```
$ docker build -t quay.io/eris/toadserver:demo .
```

The `-t` specifies a path/to/name:tag for your image while `.` at the end is the path to the Dockerfile. You'll see a bunch of output of your build then you can run `$ docker images` to see a list of images. If the build was successful, yours will be there. Once you've tested your dockerized-application-as-a-service (or would simply like to share it with others), you can

```
$ docker push quay.io/eris/toadserver:demo
```

(after logging in, of course. It's all pretty similar to git.)

## Service Definition File

Once one has an image, the usual way to launch a docker container running that image is with `docker run` from the command line. This command specifies a ton of parameters (or not!) for deploying various applications. Working with a definition file simplifies a lot of things. We'll first make one then I'll walk through equivalent `docker run` command. Start with:

```
$ eris services new toad quay.io/eris/toadserver:demo
```

This creates a new service named "toad" with image "quay.io/eris/toadserver:demo" and writes it to `~/.eris/services/toad.toml`. See it then open it with:

```
$ eris services cat toad
$ eris services edit toad
```

You'll see something like:

```
# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

name = "toad"

[service]
name = "toad"
image = "quay.io/eris/toadserver:demo"
data_container = true
[dependencies]

[maintainer]
name = "Zach Ramsay"
email = "zach@erisindustries.com"

[location]

[machine]
```

(Factlet: under the hood, maintainer info was autopopulated via git config settings.)

This file is a good start but it's not quite what we want. The toadserver service definition file was used used in the previous sequence way above and looks something like:

```
name = "toadserver"
chain = "$chain:toad:l"

[service]
name = "toadserver"
image = "quay.io/eris/toadserver"
ports = [ "11113:11113" ]
volumes = [  ]
environment = [
	"MINTX_NODE_ADDR=http://toad:46657/",
	"MINTX_CHAINID=toadserver",
	"MINTX_SIGN_ADDR=http://keys:4767",
	"MINTX_PUBKEY=162ECE7A10260292CC562921725154193FA41C791AF4B2F2324687BF43C2107D",
	"ERIS_IPFS_HOST=http://ipfs",
	"TOADSERVER_IPFS_NODES=$NODES"
]

[dependencies]
services = [ "ipfs", "keys" ]

[maintainer]
name = "Eris Industries"
email = "support@erisindustries.com"

[location]
repository = "github.com/eris-ltd/toadserver"

[machine]
include = [ "docker" ]
requires = [ "" ]
```

This has all the runtime requirements for the toadserver. Under the hood, `$ eris services start toadserver` will marshal these fields then, using [go-dockerclient](https://godoc.org/github.com/fsouza/go-dockerclient), execute the `docker run` sequence. See [here](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/) for the services specification. From the command line, this service definition file looks like:

```bash
$ docker run --name toadserver \
--publish 11113:11113 \
--link eris_service_ipfs_1:ipfs \
--link eris_service_keys_1:keys \
--link eris_chain_toadserver_1:toad \
--env "MINTX_NODE_ADDR=http://toad:46657/" \
--env "MINTX_CHAINID=toadserver" \
--env "MINTX_SIGN_ADDR=http://keys:4767" \
--env "MINTX_PUBKEY=162ECE7A10260292CC562921725154193FA41C791AF4B2F2324687BF43C2107D" \
--env "ERIS_IPFS_HOST=http://ipfs" \
--env "TOADSERVER_IPFS_NODES=$NODES" \
  quay.io/eris/toadserver
```

What a hassle it would be if you had to type this up at the command line every time you wanted to start a service. Not only that, this command above expects each container it is `--link`ing to, to already be running! That means `docker run` for each ipfs, keys, and your chain. Instead, just add the services you need as `[dependencies]` and they'll be started when and where you need them!

So there you have it. Write an app. Write a Dockerfile. Build app from Dockerfile. Write service definition file. Add dependencies. Start service. Use service. In part 2, we'll go over deploying the toadserver to > 1 node and how it's being used as part of the `eris init` sequence.
