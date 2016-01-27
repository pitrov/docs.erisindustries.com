---

layout:     documentation
title:      "Documentation | eris:cli | eris services exec"

---

# eris services exec

Run a command or interactive shell

## Synopsis

Run a command or interactive shell in a container with volumes-from the data container

```bash
eris services exec NAME
```

## Options

```
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val2 syntax
  -i, --interactive[=false]: interactive shell
  -l, --links=[]: multiple containers can be linked can be passed using the KEY1:val1,KEY2:val2 syntax
  -p, --publish[=false]: publish random ports
      --volume="": mount a volume /home/ubuntu/.eris/VOLUME on a host machine to a /home/eris/.eris/VOLUME on a container
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris services](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services/)	 - Start, stop, and manage services required for your application.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

