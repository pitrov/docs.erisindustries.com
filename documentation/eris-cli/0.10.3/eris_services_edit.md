---

layout:     documentation
title:      "Documentation | eris:cli | eris services edit"

---

# eris services edit

Edit a service.

## Synopsis

Edit a service definition file which is kept in ~/.eris/services.

Edit will utilize your default editor.

NOTE: Do not use this command for configuring a *specific* service. This
command will only operate on *service configuration file* which tell Eris
how to start and stop a specific service.

How that service is used for a specific project is handled from project
definition files.

For more information on project definition files please see: [eris help projects].

```bash
eris services edit [name]
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

