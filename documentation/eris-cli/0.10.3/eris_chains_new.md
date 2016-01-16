---

layout:     documentation
title:      "Documentation | eris:cli | eris chains new"

---

# eris chains new

Creates a new blockhain.

## Synopsis

Creates a new blockchain.

Will use a default genesis.json unless a --genesis flag is passed.
Still a WIP.

```bash
eris chains new [name]
```

## Options

```
      --N=1: make a new genesis.json with this many validators and create data containers for each
  -a, --api[=false]: turn the chain on using erisdb's api
  -c, --config="": config.toml file
      --csv="": render a genesis.json from a csv file
      --dir="": a directory whose documentations should be copied into the chain's main dir
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val1 syntax
  -g, --genesis="": genesis.json file
  -l, --links=[]: multiple containers can be linked using the KEY1:val1,KEY2:val1 syntax
      --options=[]: space separated <key>=<value> pairs to set in config.toml
      --priv="": pass in a priv_validator.json file (dev-only!)
  -p, --publish[=false]: publish random ports
      --serverconf="": pass in a server_conf.toml file
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris chains](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains/)	 - Start, Stop, and Manage Blockchains.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

