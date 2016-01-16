---

layout:     documentation
title:      "Documentation | eris:cli | eris keys export"

---

# eris keys export

Export a key from container to host.

## Synopsis

Export a key from container to host.
	

Takes a key from:
/home/eris/.eris/keys/data/ADDR/ADDR

in the keys container and copies it to
$HOME/user/.eris/keys/data/ADDR/ADDR

on the host. Optionally specify host destination with --dest.

```bash
eris keys export ADDR
```

## Options

```
      --addr="": address of key to export
      --dest="": destination for export on host
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris keys](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_keys/)	 - Do specific tasks with keys *for dev only*.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

