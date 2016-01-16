---

layout:     documentation
title:      "Documentation | eris:cli | eris chains rm"

---

# eris chains rm

Remove an installed chain.

## Synopsis

Remove an installed chain.

Command will remove the chain's container but will not
remove the chain definition file.

```bash
eris chains rm NAME
```

## Options

```
  -x, --data[=false]: remove data containers also
  -f, --file[=false]: remove chain definition file as well as chain container
  -o, --vol[=true]: remove volumes
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

