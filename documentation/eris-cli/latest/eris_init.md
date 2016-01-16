---

layout:     documentation
title:      "Documentation | eris:cli | eris init"

---

# eris init

Initialize the ~/.eris directory with default files or update to latest version

## Synopsis

Create the ~/.eris directory with actions and services subfolders
and clone eris-ltd/eris-actions eris-ltd/eris-services into them, respectively.

```bash
eris init
```

## Options

```
      --actions[=false]: only update the default actions (requires git to be installed)
      --services[=false]: only update the default services (requires git to be installed)
  -p, --skip-pull[=false]: do not clone the default services and actions; use the flag when git is not installed
      --yes[=false]: over-ride command-line prompts (requires git to be installed)
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

