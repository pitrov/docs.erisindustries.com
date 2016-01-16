---

layout:     documentation
title:      "Documentation | eris:cli | eris keys import"

---

# eris keys import

Import a key to container from host.

## Synopsis

Import a key to container from host.

Takes a key from:
$HOME/user/.eris/keys/data/ADDR/ADDR

on the host and copies it to
/home/eris/.eris/keys/data/ADDR/ADDR

in the keys container.

```bash
eris keys import ADDR
```

## Options

```
      --addr="": address of key to import
      --src="": source on host to import from. give full filepath to key
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

