---

layout:     documentation
title:      "Documentation | eris:cli | eris data export"

---

# eris data export

Export a named data container's directory to a host directory

## Synopsis

Export a named data container's directory to a host directory.
Requires src and dest for each container and host, respectively.
Container path enters at /home/eris/.eris
Destination (host) path can be relative.

```bash
eris data export NAME SRC DEST
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## See Also

* [eris data](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data/)	 - Manage data containers for your application.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

