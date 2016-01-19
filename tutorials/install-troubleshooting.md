---

layout: docs
title: "Tutorials | Trouble Shooting Your Installation"

---

# I'm On OSX or Windows and It's All Wonky!

Never fear, the marmots are here. See [Section 1 of our docker-machine tutorial](../tool-specific/docker_machine/) and come back to your installation. All will be well.

# No `eris` command found

If you get a "No command 'eris' found" error then (if you built from source) you need to make sure that your `$GOPATH/bin` is in your `$PATH` (see [Getting Started](https://docs.erisindustries.com/tutorials/getting-started/) and then do:

```irc
cd $GOPATH/src/github.com/eris-ltd/eris-cli/cmd/eris
go install
cd ~1
eris init
```

If you received that error but you performed the binary installation, then you will need to make sure that the zip or tarball which was extracted from the Github Releases page was installed into a place in your PATH which the shell can use. Please see the documentation for your operating system, or ask the Google for help.

# No Output At All

If you type `eris init` or `eris init --debug` and you get **no** output, this is almost always because your current user is not added to the docker group. To fix:

```bash
sudo usermod -a -G docker $USER
```

From the user who will be using eris.

You will need to close the terminal window and open a new terminal for the changes to take effect. If you are ssh-ing into a cloud based development machine, then log out and log back in so that the changes will take effect.

Double check that your changes have taken hold (after you log back in or in a new terminal window) by:

```bash
groups $USER
```

From the user who will be using eris.

Confirm that the line output includes `docker` and you will be good to go!

# No `gcc` executable

`gcc` is a compilation tool used behind the scenes to install eris. Most linux versions ship with `gcc` installed, but some do not. Some cloud providers deploy a very limited Ubuntu if you choose a default machine to deploy.

If, during `go get`, you receive an error which looks like this:

```
... github.com/eris-ltd/eris-cli/Godeps/_workspace/src/github.com/docker/docker/pkg/term
exec: "gcc": executable file not found in $PATH
```

Then you can fix that on Ubuntu/Debian:

```bash
sudo apt-get install gcc
```

Or, on OSX:

```bash
brew install gcc
```

# Can't See What's Happening?

By default, `eris` is a fairly quiet tool. If you would like to have more output you can add `-v` (for verbose) **or** `-d` (for debug) to any command in order to see more output. In general, there is not need to use *both* of these flags. The `--verbose` flag will give a bit more output than the command will by default and the `--debug` flag will give *much* more output than the either the `--verbose` flag or the command by default.

If you are reporting a bug, please rerun the command which caused the issue with the debug flag (`-d` or `--debug`) and send us the output to a [Github Issue](https://github.com/eris-ltd/eris-cli/issues/new) or via Community Driven [Support Forums](https://support.erisindustries.com).

