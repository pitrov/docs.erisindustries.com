---

layout:     documentation
title:      "Documentation | eris:cli | eris config"

---

# eris config

Manage configuration settings.

## Synopsis

Display and manage configuration settings for various components of the
Eris platform and for the platform itself.

The [eris config] command is only for configuring the Eris platform:
it will not work to configure any of the blockchains, services
or projects which are managed by the Eris platform. To configure
blockchains use [eris chains config]; to configure services use [eris services config]; 
to configure projects use [eris projects config] command.

```bash
eris config
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## Subcommands

* [eris config edit](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_config_edit/)	 - Edit a config for in an editor.
* [eris config set](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_config_set/)	 - Set a config value.
* [eris config show](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_config_show/)	 - Display the config.

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

