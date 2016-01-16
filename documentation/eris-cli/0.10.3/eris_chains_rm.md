---

layout:     documentation
title:      "Documentation | eris:cli | eris chains rm"

---

# eris chains rm

Removes an installed chain.

## Synopsis

Removes an installed chain.

Command will remove the chain's container but will not
remove the chain definition file.

Use the --force flag to also remove the chain definition file.

```bash
eris chains rm [name]
```

## Options

```
  -x, --data[=false]: remove data containers also
  -f, --file[=false]: remove chain definition file as well as chain container
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

