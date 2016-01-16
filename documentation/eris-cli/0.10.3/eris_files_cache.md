---

layout:     documentation
title:      "Documentation | eris:cli | eris files cache"

---

# eris files cache

Cache files to IPFS.

## Synopsis

Cache files to IPFS' local daemon.

Caches a files locally via IPFS pin, by hash.
Optionally pass in a csv with: cache --csv=[fileName]
Note: "put" will "cache" recursively by default

```bash
eris files cache [fileHash]
```

## Options

```
      --csv="": specify a .csv with entries of format: hash,fileName
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

