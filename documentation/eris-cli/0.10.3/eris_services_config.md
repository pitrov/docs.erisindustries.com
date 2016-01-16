---

layout:     documentation
title:      "Documentation | eris:cli | eris services config"

---

# eris services config

Configure a service.

## Synopsis

Configures a service by reading from and writing to a service configuration file
which is kept in ~/.eris/services.

NOTE: Do not use this command for configuring a *specific* service. This
command will only operate on *service configuration file* which tell Eris
how to start and stop a specific service. How that service is used for a
specific project is handled from project definition files. For more
information on project definition files please see: [eris help projects].

```bash
eris services config [name] [key]:[val]
```

## Options

```
  -h, --help=false: help for config
```

## See Also

* [eris services](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_services/)	 - Start, Stop, and Manage Services Required for your Application.

## Specifications

* [Actions Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_definitions_spec/)
* [Config Definition Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/config_definition_spec/)
* [Projects Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/projects_definitions_spec/)
* [Remotes Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/remotes_definitions_spec/)
* [Services Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_definitions_spec/)

