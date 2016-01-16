---

layout:     documentation
title:      "Documentation | eris:cli | eris config"

---

# eris config

Manage Configuration Settings for Eris.

## Synopsis

Display and Manage configuration settings for various components of the
Eris platform and for the platform itself.

NOTE: [eris config] is only for configuring the Eris platform
it will not work to configure any of the blockchains, services
or projects which are managed by the Eris platform. To configure
blockchains use [eris chains config]; to configure services
use [eris services config]; to configure projects use
[eris projects config].

```bash
eris config
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## Subcommands

* [eris config edit](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_config_edit/)	 - Edit a config for the Eris Platform CLI in an editor.
* [eris config set](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_config_set/)	 - Set a config for the Eris Platform CLI.
* [eris config show](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_config_show/)	 - Display the config for the Eris Platform CLI.

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

