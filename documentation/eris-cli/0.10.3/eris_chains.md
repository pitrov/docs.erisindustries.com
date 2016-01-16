---

layout:     documentation
title:      "Documentation | eris:cli | eris chains"

---

# eris chains

Start, Stop, and Manage Blockchains.

## Synopsis

Start, Stop, and Manage Blockchains.

The chains subcommand is used to work on erisdb smart contract
blockchain networks. The name is not perfect, as eris is able
to operate a wide variety of blockchains out of the box. Most
of those existing blockchains should be ran via the

eris services ...

commands. As they fall under the rubric of "things I just want
to turn on or off". While you can develop against those
blockchains, you generally aren't developing those blockchains
themselves.

Eris chains is built to help you build blockchains. It is our
opinionated gateway to the wonderful world of permissioned
smart contract networks.

Your own baby blockchain/smart contract machine is just an

eris chains new

away!

```bash
eris chains
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## Subcommands

* [eris chains cat](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_cat/)	 - Displays chains definition file.
* [eris chains checkout](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_checkout/)	 - Checks out a chain.
* [eris chains current](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_current/)	 - The currently checked out chain.
* [eris chains edit](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_edit/)	 - Edit a blockchain.
* [eris chains exec](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_exec/)	 - Run a command or interactive shell
* [eris chains export](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_export/)	 - Export a chain definition file to IPFS.
* [eris chains graduate](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_graduate/)	 - Graduates a chain to a service.
* [eris chains import](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_import/)	 - Import a chain definition file from Github or IPFS.
* [eris chains inspect](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_inspect/)	 - Machine readable chain operation details.
* [eris chains install](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_install/)	 - Install a blockchain from the etcb registry.
* [eris chains known](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_known/)	 - List all the blockchains Eris knows about.
* [eris chains logs](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_logs/)	 - Display the logs of a blockchain.
* [eris chains ls](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_ls/)	 - Lists all known blockchains in the Eris tree.
* [eris chains new](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_new/)	 - Creates a new blockhain.
* [eris chains plop](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_plop/)	 - Plop the genesis or config file
* [eris chains ports](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_ports/)	 - Print the port mapping
* [eris chains ps](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_ps/)	 - List the running blockchains.
* [eris chains register](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_register/)	 - Registers a blockchain on etcb (a blockchain for registering other blockchains
* [eris chains rename](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_rename/)	 - Rename a blockchain.
* [eris chains rm](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_rm/)	 - Removes an installed chain.
* [eris chains start](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_start/)	 - Start a blockchain.
* [eris chains stop](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_stop/)	 - Stop a running blockchain.
* [eris chains update](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains_update/)	 - Updates an installed chain.

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

