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
      --all[=false]: update all the above and skip command-line prompts (requires git and go to be installed)
  -b, --branch="master": specify a branch to update from (mostly used for eris update) (requires git to be installed)
      --services[=false]: only update the default services (requires git to be installed)
  -p, --skip-pull[=false]: do not clone the default services and actions; use the flag when git is not installed
      --tool[=false]: only update the eris cli tool and nothing else (requires git and go to be installed)
      --yes[=false]: over-ride command-line prompts (requires git to be installed)
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

