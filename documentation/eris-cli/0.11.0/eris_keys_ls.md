---

layout:     documentation
title:      "Documentation | eris:cli | eris keys ls"

---

# eris keys ls

List keys on host and in running keys container

## Synopsis

List keys on host and in running keys container

Specify location with flags --host or ---container.

Latter flag is equivalent to:
the [eris actions do keys list] command, which itself wraps
the [eris services exec keys "ls /home/eris/.eris/keys/data"] command.

```bash
eris keys ls
```

## Options

```
      --container[=false]: list keys in container: looks in /home/eris/.eris/keys/data
      --host[=false]: list keys on host: looks in $HOME/.eris/keys/data
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

