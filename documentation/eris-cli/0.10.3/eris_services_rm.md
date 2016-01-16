---

layout:     documentation
title:      "Documentation | eris:cli | eris services rm"

---

# eris services rm

Removes an installed service.

## Synopsis

Removes an installed service.

Command will remove the service's container but will not
remove the service definition file.

Use the --force flag to also remove the service definition file.

```bash
eris services rm [name]
```

## Options

```
  -x, --data[=false]: remove data containers as well
  -f, --file[=false]: remove service definition file as well as service container
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris services](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_services/)	 - Start, Stop, and Manage Services Required for your Application.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

