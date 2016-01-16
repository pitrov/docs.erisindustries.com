---

layout:     documentation
title:      "Documentation | eris:cli | eris chains new"

---

# eris chains new

Create a new blockhain.

## Synopsis

Create a new blockchain.

The creation process will both create a blockchain on the current machine
as well as start running that chain.

If you need to update a chain after creation, you can update any of the
appropriate settings in the chains definition file for the named chain
(which will be located at ~/.eris/chains/NAME.toml) and then
utilize [eris chains update NAME -p] to update the blockchain appropriately
(using the -p flag will force eris not to pull the most recent docker image
for eris:db).

Will use a default genesis.json from ~/.eris/chains/default/genesis.json
unless a --genesis flag is passed.

Will use a default config.toml from ~/.eris/chains/default/config.toml
unless the --options flag is passed.

Will use a default eris:db server config from ~/.eris/chains/default/server_conf.toml
unless the --serverconf flag is passed.

For more complex blockchain creation, you will want to "hand craft" a genesis.json
see our tutorial for chain creation here:
https://docs.erisindustries.com/tutorials/chainmaking/

```bash
eris chains new NAME
```

## Options

```
      --N=1: make a new genesis.json with this many validators and create data containers for each
  -a, --api[=false]: turn the chain on using erisdb's api
  -c, --config="": config.toml file
      --csv="": render a genesis.json from a csv file
      --dir="": a directory whose contents should be copied into the chain's main dir
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val2 syntax
  -f, --force[=false]: overwrite data in  ~/.eris/data/chainName
  -g, --genesis="": genesis.json file
  -l, --links=[]: multiple containers can be linked using the KEY1:val1,KEY2:val2 syntax
      --options=[]: space separated <key>=<value> pairs to set in config.toml
      --priv="": pass in a priv_validator.json file (dev-only!)
  -p, --publish[=false]: publish random ports
      --serverconf="": pass in a server_conf.toml file
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris chains](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_chains/)	 - Start, stop, and manage blockchains.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

