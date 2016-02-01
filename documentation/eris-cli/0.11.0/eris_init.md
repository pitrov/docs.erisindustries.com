---

layout:     documentation
title:      "Documentation | eris:cli | eris init"

---

# eris init

Initialize your work space for smart contract glory.

## Synopsis

Create the ~/.eris directory with actions and services subfolders
and clone eris-ltd/eris-actions eris-ltd/eris-services into them, respectively.

```bash
eris init
```

## Options

```
      --pull-images     by default, pulls and/or update latest primary images. use flag to skip pulling/updating of images. (default true)
      --source string   source from which to download definition files for the eris platform. if toadserver fails, use: rawgit (default "rawgit")
      --testing         DO NOT USE (for testing only)
      --yes             over-ride command-line prompts
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

