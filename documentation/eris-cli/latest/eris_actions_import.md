---

layout:     documentation
title:      "Documentation | eris:cli | eris actions import"

---

# eris actions import

Import an action definition file from Github or IPFS.

## Synopsis

Import an action definition for your platform.

By default, Eris will import from ipfs.

```bash
eris actions import NAME LOCATION
```

## Examples

```bash
$ eris actions import "do not use" QmNUhPtuD9VtntybNqLgTTevUmgqs13eMvo2fkCwLLx5MX
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris actions](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_actions/)	 - Manage and perform structured actions.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

