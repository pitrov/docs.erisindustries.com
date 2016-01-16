---

layout: wide
title: "Getting Started With Eris"

---

# Get Started With Eris In Three Easy Steps

There are three steps need to get moving with Eris:

1. **Install** the Eris platform.
2. **Roll** your own Blockchain in seconds.
3. **Build** (and run) your distributed application using smart contract templates and a simple, web-based user interface.

# Step 1: Install the Eris Platform

**Dependencies**: `eris` has 2 dependencies: [Docker](https://www.docker.com/) and [Go](https://golang.org).

* Docker is a run anywhere container solution which makes development, deployment, testing, and running of distributed applications a breeze.
* Go is a programming language we use to build our software.

We have binary releases for `eris` available at this time via our [Github Releases](https://github.com/eris-ltd/eris-cli/releases). For those on Linux we also have (beta) `apt-get`  and (experimental) `yum` support.

**Note** if you install the binary of `eris` you **do not** need to install `go`; however, you **do** need to install Docker.

Currently we consider the most workable setup to be (what our tests consider authoritative). We are working steadily toward making eris available for a wide variety of host environments.

* HOST_OS = {{ site.data.coding["os"].authoritative }}
* GO = {{ site.data.coding["golang"].authoritative }}
* DOCKER = {{ site.data.coding["docker"].authoritative }}

### [Install Docker](http://docs.docker.com/installation/).

Installation requires that Docker be installed. Please see the [Docker](https://docs.docker.com/installation/) documentation for how to install.

At the current time, `eris` requires `docker` >= {{ site.data.coding["docker"].minimum }}. You can check your docker version with `docker version`. We do not test against older versions of docker. `eris` may or may not work against earlier versions of docker and we can make no guarantees of usability there.

#### Docker Installation for Linux

Follow the link above for the official way to install Docker on your Linux box.

**Essential**! After you install docker, then you must make sure that the user you are using to develop with `eris` has access to the docker socket (which is accessible via the docker Linux usergroup). When you are logged in as the user you can do this:

```
(sudo) usermod -a -G docker $USER
```

That command will add the current user to the docker group which will mean that docker will not need to be called from `sudo`.

After you run that command, then please log out of the current shell and open a new shell. After that `eris` will then be able to connect to docker.

The above command *may* be skipped, but if you do, then you will need to run all `eris` commands either as the root user or using `sudo`.

**Note** Docker does not run on 32bit architecture. If you are using a Linux box, please **make sure** it is 64bit architecture.

#### Docker Installation for OSX & Windows

If you are on OSX or Windows, the [Docker Toolbox](https://www.docker.com/toolbox) is a graphical way of installing Docker, Virtualbox and Docker Machine. The Toolbox will build all of the functionality which Docker requires so that `eris` is able to connect into the Docker daemon.

**Note** that the Docker Toolbox will install VirtualBox by default. Because Docker runs by connecting into a **Linux** kernel, Docker only runs on Linux OS's at this time. While Docker is reportedly working on native solutions for other operating systems, at this time a Linux operating system is required.

By default the Docker Toolbox will use VirtualBox to create a very minimal Linux virtual machine with the Docker daemon preinstalled. The toolbox will install Docker-Machine which is used to start, stop, reboot, remove, etc. virtual machines via VirtualBox's API.

`eris` has been built to be able to connect into the Docker daemon running within a VirtualBox minimal Linux virtual machine by default and without any effort on your part (other than installing the Docker Toolbox).

If virtualbox gives you trouble, then use [docker machine's plugins](https://github.com/docker/machine/blob/master/docs/AVAILABLE_DRIVER_PLUGINS.md) and create your `eris` machine [in the cloud](../chaindeploying/).

#### OSX Only

If you're a brew and brew cask user then:

```
brew cask install virtualbox
brew install docker docker-machine
```

#### Windows Only

If you're a chocolatey user then:

```
choco install virtualbox docker docker-machine
```

#### Windows Only (applies to `eris` < 0.11)

While this paragraph has *nothing* to do with Docker, it is important to note that if you are using Windows you will also need to make sure that `tar` is installed on your platform. Please see [here](http://gnuwin32.sourceforge.net/packages/gtar.htm) for **one** way to install `tar` on windows. If that does not work for your platform please see Google.

#### All Platforms

Make sure that everything is setup with Docker by running:

```
docker version
```

### [Install Go](https://golang.org/doc/install)

At the current time, `eris` requires `go` >= {{ site.data.coding["golang"].minimum }}. Go is not needed if you install `eris` via a binary installation (details below).

An easy way to install go (for OSX and Linux) is via Travis-CI's [Gimme](https://github.com/travis-ci/gimme) tool. First you install gimme; then `eval $(gimme {{ site.data.coding["os"].authoritative }})` and you'll be all set up.

Otherwise, please see the documentation in the above link to install go.

#### All Platforms

Please see the link above for the official way to install Go on your operating system.

Make sure that Go is properly installed by running:

```
go version
```

Once you have go installed, then you will want to make sure that you also have your `$GOPATH` in your `$PATH`. Most gophers add the following line to their `~/.bashrc`, `~/.profile`, `~/.zshrc` file or other relevant file.

```
export PATH="$GOPATH/bin:$PATH"
```

**Note** you will need to make sure that you perform the above command for the *user* which will be running eris.

If you do not add that line to the relevant shell file then you can just type that line into the shell each time you log in. You can check that this change was added by `echo $PATH` and making sure that your path has been updated appropriately.

Now you're ready to install the components of the Eris platform.

## Install Eris

`eris` can be installed in one of two ways. Either you can install `eris` via our binary distribution for your operating system or via building with go. Each of these installation methods is covered below.

### Binary Installation

We distribute binaries via our [Github Releases Page](https://github.com/eris-ltd/eris-cli/releases). You will simply need to download the proper zip or tarball for your architecture and then extract that into a place in your PATH.

#### apt-get installation

We have (beta) `apt-get` support for most current versions of Debain and Ubuntu. If you wish to use apt-get to install `eris` then you will simply perform the following:

```
sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys DDA1D0AB
sudo echo "deb https://apt.eris.industries DIST main" > /etc/apt/sources.list.d/eris.list
```

**Note** in the above command you **must** replace `DIST` with the distribution codename for your version of Debian or Ubuntu (vivid, trusty, jessie, etc.). We intend to make this easier in coming releases. We do not use the major-minor distribution pattern (e.g., `ubuntu-trusty`) as Docker does, but rather we just use (`trusty`) as the DIST codename.

Once the apt repository is added to your sources then:

```
sudo apt-get update
sudo apt-get install eris
```

Check that everything installed correctly with:

```
eris init
```

#### yum installation

We now have (experimental) `yum` support for most current versions of Fedora, CentOS, RHEL, etc. If you wish to use yum to install `eris` then you will perform the following:

```bash
sudo curl -sSL https://yum.eris.industries/eris.repo > /etc/yum.repos.d/eris.repo
yum install eris-cli
```

Yum support is still quite experimental, so please do not rely on it, but please do let us know any issues you have with the installation and we will make sure to address those as quickly as we can.

### Building From Source

Go is very easy to build from source. Indeed it is really only one command.

```
go get github.com/eris-ltd/eris-cli/cmd/eris
```

Now you're ready to go.

```
eris init
```

**Tip**: To see all the new stuff happening:

```irc
eris update --branch develop
```

## Troubleshooting Your Install

If you have any errors which arise during the installation process, please see our [trouble shooting page](../install-troubleshooting/) or visit our [support forums](https://support.erisindustries.com)

# Step 2: Roll Your Own Blockchain in Seconds

If you want to create your blockchain it is very easy.

```irc
eris chains new test_chain
```

That `test_chain` can be whatever name you would like it to be. This simple command will create a permissioned, smart contract enabled blockchain suitable for testing.

To check that your chain is running type:

```irc
eris chains ls
```

Obviously, you will want an ability to make chains which you properly parameterize. As such you can always type:

```irc
eris chains new --help
```

To see the various files which you can give to chains new for it to be instantiated properly.

Eris does not only work with permissioned smart contract networks. It works just as well with existing blockchains. Want to run bitcoin?

```irc
eris services start btcd
```

Want to run ethereum?

```irc
eris services start eth
```

That's it. Your chain is rolled!

# Step 3: Build (and run) your Distributed Application

{% image 'CEu7odJWMAA3VSa.jpg' %}

Now you're ready to build and run your distributed application!

There are a lot of ways you can go from here!

**To continue this getting started tour please see our next tutorial in this series on [Making Your Own Permissioned Chain](../chainmaking).**

Please go here if you are interested in [learning about smart contracts](/explainers/smart_contracts/).

Please go here if you are interested in [learning more about blockchains](/explainers/blockchains/).

Please go here if you are interested in [continuing to go into the rabbit hole of distributed tech](/tutorials/).
