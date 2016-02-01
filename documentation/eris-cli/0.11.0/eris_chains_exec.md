---

layout:     documentation
title:      "Documentation | eris:cli | eris chains exec"

---

# eris chains exec

Run a command or interactive shell

## Synopsis

Run a command or interactive shell in a container
with volumes-from the data container

```bash
eris chains exec NAME
```

## Options

```
      --image string   Docker image
  -i, --interactive    interactive shell
  -l, --links value    multiple containers can be linked can be passed using the KEY1:val1,KEY2:val2 syntax (default [])
  -p, --publish        publish random ports
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## See Also

* [eris chains](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_chains/)	 - Start, stop, and manage blockchains.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

