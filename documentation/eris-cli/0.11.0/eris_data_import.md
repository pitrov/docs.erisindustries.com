---

layout:     documentation
title:      "Documentation | eris:cli | eris data import"

---

# eris data import

Import from a host folder to a named data container's directory

## Synopsis

Import from a host folder to a named data container's directory.
Requires src and dest for each host and container, respectively.
Container path enters at /home/eris/.eris
Source (host) path must be absolute and destination dir must exist.

```bash
eris data import NAME SRC DEST
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris data](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data/)	 - Manage data containers for your application.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

