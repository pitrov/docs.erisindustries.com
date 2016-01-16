---

layout:     documentation
title:      "Documentation | eris:cli | eris clean"

---

# eris clean

Cleans up your eris working environment

## Synopsis

Stops and force removes all eris containers 
	(chains, services, datas, etc) by default. Useful
	for development.

```bash
eris clean
```

## Options

```
      --all[=false]: removes everything, stopping short of uninstalling eris
      --dir[=false]: remove the eris home directory ~/.eris
      --images[=false]: remove all eris docker images
  -y, --yes[=false]: overrides prompts prior to removing things
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

