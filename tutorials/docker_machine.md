---

layout: content
title: "Tutorials | Working with docker-machine on eris"

---

This tutorial will provide an overview of working with [docker-machine](https://docs.docker.com/machine/), a nifty tool for managing and deploying docker daemons. Eris uses a handful of docker-machine features, both as an integral part of the tool and for continous integration/testing. Windows and OSX users are ~~required~~ highly recommended to install the [Docker Toolbox](https://www.docker.com/docker-toolbox) and boot a docker-machine in order to use `eris`. Many features of the `eris` platform on linux are available without `docker-machine`, however, your blockchain superpowers are greatly enhanced with it. See linux install guidelines [here](https://docs.docker.com/machine/install-machine/). The first section of this tutorial will highlight basic `docker-machine` commands and functioning. If it feels oddly familiar, that's because I've modeled after [this intro](https://docs.docker.com/machine/get-started/) but with a marmot twist. Section two will get into the nitty gritty of the `eris <=> docker-machine` orchestration.

## Setup & Basic Commands

Note: this section is necessary to handle the nuances of installing the `eris` tool on Windows/OSX operating systems but also introduces important `docker-machine` concepts across os'. Future releases of `eris` will further simplify the process.

After installing the toolbox, clicking the `Docker Quickstart Terminal` will open a new terminal window you'll probably see something like:
```
Host does not exist: "default"
docker is configured to use the default machine with IP 
For help getting started, check out the docs at https://docs.docker.com

Host does not exist: "default"
```
So docker expects a machine named "default". Depending on where you are in the toolbox/docker/docker-machine/eris experimentation process, it could be that the toolbox already automatically created one or that it requires certificates to be regenerated (in which case you should do so). If you don't have it, go ahead and create it with:
```
$ docker-machine create default --driver virtualbox
```
Your output should be similar to the one a few line below. Since `eris` the command line tool requires a machine of the same name to operate smoothly (on osx/windows), run:
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
**That last line is critical to understanding what docker-machine does and how `eris` leverages it under the hood.**

What does it do, you ask? We'll get there. First, let's take a look at our machines:
```
$ docker-machine ls
```
There are two things to note here: the `-` under `ACTIVE` indicates that *neither* machine is active ("in scope"). Specifically, `docker` does not have access to either machines' environment variables. If you try, for example, `$ docker run hello-world`, you'll probably get an error like: `Cannot connect to the Docker daemon. Is the docker daemon running on this host?`. Yet there are two machine running! (Note: depending on how you started the toolbox, `default` *may* have a `*`, in which case the `$ docker run` command would have worked. More on this further below. 
```
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   ERRORS
default   -        virtualbox   Running   tcp://192.168.99.100:2376       
eris      -        virtualbox   Running   tcp://192.168.99.101:2376
```
Well, the machines are running, but the docker daemon doesn't know about them. Let's fix that:
```
$ docker-machine env eris
```
The output you see below is a list of environment variables that need to be set if you'd like the docker daemon to talk to the eris machine. In fact, all this command did was print to stdout.
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
This command evaluates **and sets* the environment variables output from the `env` command. There ought not be any output to your screen. Note: this command has shell/operating system nuances. See [here](https://docs.docker.com/machine/reference/env/) for solutions.

Now, re-run `$ docker-machine ls` and you'll see `eris` in scope:
```
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   ERRORS
default   -        virtualbox   Running   tcp://192.168.99.100:2376       
eris      *        virtualbox   Running   tcp://192.168.99.101:2376
```
If you're an OSX/Windows user wanting to quickly get started on the `eris` platform, here is where you would 1) install eris via go (`go get github.com/eris-ltd/eris-cli/cmd/eris`) or via [binary](link) then run `eris init`. You'll also want to note the ip of your machine with `$ docker-machine ip eris`, which should match the ip seen above. This ip replaces the use of `localhost` (linux) in some of our tutorials and maps to `0.0.0.0` of a container running with exposed ports. Similar logic applies for cloud deployements with `docker-machine`, discussed below. 



## Robots In The Sky
Although machines can be deployed locally (e.g. see above), what we really want to do is deploy cloud instances of eris services and chains. Indeed, that's the whole point









