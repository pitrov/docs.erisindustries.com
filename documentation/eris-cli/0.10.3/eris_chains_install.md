---

layout:     documentation
title:      "Documentation | eris:cli | eris chains install"

---

# eris chains install

Install a blockchain from the etcb registry.

## Synopsis

Install a blockchain from the etcb registry.

Install an existing erisdb based blockchain for use locally.

Still a WIP.

```bash
eris chains install [chainID]
```

## Options

```
  -N, --N=1: container number
  -c, --config="": main config file for the chain
      --dir="": a directory whose documentations should be copied into the chain's main dir
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val1 syntax
      --etcb-host="interblock.io:46657": set the address of the etcb chain
      --id="": id of the chain to fetch
  -l, --links=[]: multiple containers can be linked can be passed using the KEY1:val1,KEY2:val1 syntax
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

