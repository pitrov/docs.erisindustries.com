---

layout: content
title: "Tutorials | Working with docker-machine on eris"

---

This tutorial will provide an overview of working with [docker-machine](https://docs.docker.com/machine/), a nifty tool for managing and deploying docker hosts. Eris uses a handful of docker-machine features, both as an integral part of the tool and for continous integration/testing. Windows and OSX users are ~~required~~ highly recommended to install the [Docker Toolbox](https://www.docker.com/docker-toolbox) and boot a docker-machine in order to use `eris` See [here](../getting-started/) to install eris, required for this tutorial. Many features of the `eris` platform on linux are available without `docker-machine`, however, your blockchain superpowers are greatly limited without it. See linux install guidelines [here](https://docs.docker.com/machine/install-machine/). The first section of this tutorial will highlight basic `docker-machine` commands and functioning. If it feels oddly familiar, that's because I've modeled after [this intro](https://docs.docker.com/machine/get-started/) but with a marmot twist. Section two will elaborate on `eris <=> docker-machine` orchestration while section three focuses on cloud deployments.

Note: the first section is helpful in navigating the nuances of installing the eris tool on Windows/OSX operating systems but also introduces important docker-machine concepts relevant across os'. Future releases of `eris` will further simplify the process (and abstract away the use of `docker-machine` directly). On this last point, `eris` is primarily a convenience wrapper around various `docker` commands leveraging the [go-dockerclient library](https://godoc.org/github.com/fsouza/go-dockerclient). If you are new to docker, hang on! 

## Setup & Basic Commands

After installing the toolbox, clicking the `Docker Quickstart Terminal` will open a new terminal window and you'll likely see a) a success message, b) something like:

```
Host does not exist: "default"
docker is configured to use the default machine with IP 
For help getting started, check out the docs at https://docs.docker.com

Host does not exist: "default"
```

or c) that certificates require regeneration. These will depend on where you are in the toolbox/docker/docker-machine/eris experimentation process. If (c), follow the instructions. If you don't have a default machine, go ahead and create it:

```
$ docker-machine create default --driver virtualbox
```

Your output should be similar to the one a few lines below. Since `eris <=> docker-machine` can be testy on osx/windows, create a machine of the same name to please to marmots:

```
$ docker-machine create eris --drive virtualbox
```
You'll see something like:

```
Running pre-create checks...
Creating machine...
(eris) Creating VirtualBox VM...
(eris) Creating SSH key...
(eris) Starting VM...
Waiting for machine to be running, this may take a few minutes...
Machine is running, waiting for SSH to be available...
Detecting operating system of created instance...
Detecting the provisioner...
Provisioning with boot2docker...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
Checking connection to Docker...
Docker is up and running!
To see how to connect Docker to this machine, run: docker-machine env eris
```

**That last line is critical to understanding what docker-machine does and how `eris` leverages it under the hood. It will be a running theme throughout this tutorial.**

What does it do, you ask? We'll get there. First, let's take a look at our machines:

```
$ docker-machine ls
```

There are two things to note here: the `-` under `ACTIVE` indicates that *neither* machine is active ("in scope"). Specifically, `docker` has not been told to use either machines' environment variables. If you try, for example, `$ docker run hello-world`, you'll probably get an error like: `Cannot connect to the Docker daemon. Is the docker daemon running on this host?`. Yet there are two machine running! (Note: depending on how you started the toolbox, `default` *may* have a `*`, in which case the `$ docker run` command would have worked. More on this further below. 

```
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   ERRORS
default   -        virtualbox   Running   tcp://192.168.99.100:2376       
eris      -        virtualbox   Running   tcp://192.168.99.101:2376
```

Well, the machines are running, but the docker daemon doesn't know about them. Let's fix that:

```
$ docker-machine env eris
```

The output you see below is a list of environment variables that need to be set if you'd like the docker daemon to talk to the machine named eris. In fact, all this command did was stdout to the terminal.

```
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.101:2376"
export DOCKER_CERT_PATH="/Users/zicter/.docker/machine/machines/eris"
export DOCKER_MACHINE_NAME="eris"
# Run this command to configure your shell: 
# eval "$(docker-machine env eris)"
```

To put the eris machine "in scope", run:

```
$ eval "$(docker-machine env eris)"
```

This command evaluates *and sets* the environment variables output from the `env` command. There ought not be any output to your screen. Note: this command has shell/operating system nuances. See [here](https://docs.docker.com/machine/reference/env/) for solutions.

Now, re-run `$ docker-machine ls` and "eris" will be in scope:

```
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   ERRORS
default   -        virtualbox   Running   tcp://192.168.99.100:2376       
eris      *        virtualbox   Running   tcp://192.168.99.101:2376
```

To confirm: `$ docker-machine active`, which should output "eris".

If you're an OSX/Windows user wanting to quickly get started on the eris platform, here is where you would 1) install eris via go (`go get github.com/eris-ltd/eris-cli/cmd/eris`) or via [binary](link) then run `$ eris init`. You'll also want to note the ip of your machine with `$ docker-machine ip eris`, which should match the ip seen above. This ip replaces the use of `localhost` (re: linux) in some of our tutorials and maps to `0.0.0.0` of a container running with exposed ports. Similar logic applies for cloud deployements with docker-machine, discussed further below. 

There are several more `$ docker-machine` commands that I won't go through since they aren't immediately relevant to our purposes though they're definitely worth checking out.

## Machine Thinking

Above, we created two machines. These should be thought of as *two individual hosts*, in addition to the 'master' host. Indeed, the containers within them are accessed via different ip addresses. While a machine is active (in scope - remember `eval/env`), any `$ docker` command executed on the host will apply to that machine and that machine only. This means that if you `$ docker run` a handful of containers while one machine is in scope then run the `$ eval` command for another machine, `$ docker ps -a` won't show the containers you had just started because that machine is no longer in scope. Which is exactly what we want and why docker-machine is so awesome. It gets even better; all machines created (and subsequently managed) from a host have access to the hosts filesystem (but not docker images, unfortunately). This logic applies equally to all `eris` commands, which have a pre-run check to connect to docker.

**Note:** `eris` by default (on linux) does not require an active machine (but does require a running docker daemon, i.e., docker installed) whereas OSX/Windows run by default with a machine named eris in scope, as per the previous section.

Because `eris` respects the machine that is in scope (save for a few bugs on !linux), it's possible to do something like:

```
$ docker-machine create marmot1 --driver virtualbox
$ docker-machine create marmot2 --driver virtualbox
$ docker-machine create marmot3 --driver virtualbox

$ eval "$(docker-machine env marmot1)"
$ eris init
$ eris services start ipfs

$ eval "$(docker-machine env marmot2)"
$ eris init
$ eris services start ipfs

$ eval "$(docker-machine env marmot3)"
$ eris init
$ eris services start ipfs
```

resulting in three docker machines *each* running an ipfs node. Note: executing that series of commands can take awhile. If your service has any dependencies, they'll also be running on each machine. Any files that need to be copied in at runtime can be sourced from the host. So that's pretty cool. But what if you have ten machines? A hundred? This would mean running the `$ eval ...` command *each and every time* you wanted to put a machine in scope prior to executing any `eris` command. Thankfully, there's a better way. To list the running ipfs node on each machine from above, rather than using the `eval/env` combo:

```
$ eris services ls --running --machine marmot1
$ eris services ls --running --machine marmot2
$ eris services ls --running --machine marmot3
```

where the `--machine` flag tells eris to execute the listing function on *that* machine, so long as it exists and is running. This flag is global (applies to all `eris` commands) and overides any machine/environment variables in scope. This means that when using `eris`, you never have to check which one of your docker-machines is active and put it into scope before executing a command.  Up next, cloud deployments with docker-machine.

## Robots In The Sky

Note: this section is a modified (& more generalized) version of the [chain deploying tutorial](../chaindeploying/). 

Above, we deployed machines locally (using the `virtualbox` driver).. With docker-machine, this can all be done from the host. Instead of having to log into Digital Ocean/AWS, provision an instance, ssh into it, harden the server, install docker, install eris, copy in some files, and start a service/chain; it's simply a matter of:

```
$ docker-machine create mach1 --driver digitalocean  --digitalocean-access-token $DO_TOKEN
$ docker-machine create mach2 --driver digitalocean  --digitalocean-access-token $DO_TOKEN --digitalocean-region sgp1
$ docker-machine create mach3 --driver amazonec2 --amazonec2-access-key $AWS_A_KEY --amazonec2-secret-key $AWS_S_KEY --amazonec2-vpc-id $AWS_VPC
```

whereby specifying a region is optional (one will be chosen for you) and, apparently, AWS requires three tokens to DOs one. For more info on (the many) supported docker-machine drivers, see [here](https://docs.docker.com/machine/drivers/). For maximum resilence, create machines in plenty of regions and on different providers. Once you've got those machines created:

```
$ eris init --yes --machine mach1
$ eris init --yes --machine mach2
$ eris init --yes --machine mach3
```

which will initialize eris on each machine (`--yes` overides the command-line prompts) by pulling eris' default docker images and definition files into each machine. Note that we didn't need to install eris (or go, or docker) on any of those machines. Because `eris` is an (somewhat opiniated) orchestration tool that wraps `docker`, it goes where `docker` goes. And docker-machine provisions docker hosts for you. 

We've got three remote hosts, provisioned with eris images and ready for action. What a wonderful world we're in. Now `eris` can "plug in" to each one of these machines with only a flag. Some things you could do with, say, 30 machines each named btcd/core/class0-9, respectively:

```
$ eris services start btcd --machine btcd0
$ eris services start btcd --machine btcd1
...
$ eris services start bitcoincore --machine core0
$ eris services start bitcoincore --machine core1
...
$ eris services start bitcoinclassic --machine class0
$ eris services start bitcoinclassic --machine class1
...
```

and you'd have ten of each full nodes to run simulations against or something else. Perhaps performance of different tor relays is more interesting. In this case, to overide the default relay to run (exit node) you'll have to make a small modification to the tor service definition file:

```
$ eris services edit tor
```

will open the file; the last line here can be edited next:

```
# replace 'exit' with 'bridge' or 'middle'
# depending on the type of relay you'd like to run
command = "-f /etc/tor/torrc.exit"
```

but first:

```
$ eris services start tor --machine exit0
$ eris services start tor --machine exit1
...
```

then edit the file, replacing 'exit' with 'bridge':

```
$ eris services start tor --machine bridge0
$ eris services start tor --machine bridge1
...
```

and so on, until you have 10 of each an exit, bridge, and middle relay. As an aside, it would be trivial to make a new service definition file for each type of relay named `tor_exit.toml`, `tor_bridge.toml`, `tor_middle.toml` that would be marshalled by `$ eris services start tor exit/bridge/middle`, respectively. This avoids having to edit the service definition file every time a different relay is to be run. At any rate, this should give you a good idea of how to leverage docker-machine on the eris platform.

But wait! What about the hassle of having to `$ eris services start NAME --machine number99` a service many times over, not to mention that each machine had to have been created manually from the command line? Not to fret, the command `$ eris remotes` is in our pipeline and will likely take the form of a configuration file to specify N machines in X region from Y cloud provider, starting services Z+n; be it a chain, ipfs, bitcoin, or any combination of any processes that can be dockerized. 
