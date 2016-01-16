---

layout:     documentation
title:      "Documentation | eris:cli | eris files get"

---

# eris files get

Pull files from IPFS via a hash and save them locally.

## Synopsis

Pull files from IPFS via a hash and save them locally.

Optionally pass in a csv with: get --csv=[fileName]

```bash
eris files get [hash] [fileName]
```

## Options

```
      --csv="": specify a .csv with entries of format: hash,fileName
      --dirname="": name of new directory to dump IPFS files from --csv
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris files](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_files/)	 - Manage Files Needed for Your Application Using IPFS.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

