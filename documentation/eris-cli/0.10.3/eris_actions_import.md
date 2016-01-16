---

layout:     documentation
title:      "Documentation | eris:cli | eris actions import"

---

# eris actions import

Import an action definition file from Github or IPFS.

## Synopsis

Import an action definition for your platform.

By default, Eris will import from ipfs.

To list known actions use: [eris actions known].

```bash
eris actions import [name] [location]
```

## Examples

```bash
  eris actions import "do not use" QmNUhPtuD9VtntybNqLgTTevUmgqs13eMvo2fkCwLLx5MX
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris actions](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_actions/)	 - Manage and Perform Structured Actions.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

