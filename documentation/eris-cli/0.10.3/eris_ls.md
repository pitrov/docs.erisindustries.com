---

layout:     documentation
title:      "Documentation | eris:cli | eris ls"

---

# eris ls

List everything that is installed and built.

## Synopsis

Lists the built services and chains known to Eris.

To list the known services: [eris services known]. This will show
all services which exist in the form of locally held service
definition files.

To list the running services: [eris services ps]. This is the service
which are currently running.

To start a service use: [eris services start serviceName].

```bash
eris ls
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

