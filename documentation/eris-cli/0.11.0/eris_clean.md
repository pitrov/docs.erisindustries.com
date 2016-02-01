---

layout:     documentation
title:      "Documentation | eris:cli | eris clean"

---

# eris clean

Clean up your eris working environment.

## Synopsis

Stops and force removes all eris containers
	(chains, services, datas, etc) by default. Useful
	for development.

```bash
eris clean
```

## Options

```
      --all      removes everything, stopping short of uninstalling eris
      --dir      remove the eris home directory ~/.eris
      --images   remove all eris docker images
  -y, --yes      overrides prompts prior to removing things
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

