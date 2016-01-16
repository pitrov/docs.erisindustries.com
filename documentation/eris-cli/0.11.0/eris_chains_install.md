---

layout:     documentation
title:      "Documentation | eris:cli | eris chains install"

---

# eris chains install

Install a blockchain from the etcb registry.

## Synopsis

Install a blockchain from the etcb registry.

Install an existing erisdb based blockchain for use locally.

(Currently a work in progress.)

```bash
eris chains install NAME
```

## Options

```
  -N, --N=1: container number
  -c, --config="": main config file (config.toml) for the chain
      --dir="": a directory whose contents should be copied into the chain's main dir
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val2 syntax
      --etcb-host="interblock.io:46657": set the address of the etcb chain
      --id="": id of the chain to fetch
  -l, --links=[]: multiple containers can be linked can be passed using the KEY1:val1,KEY2:val2 syntax
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

