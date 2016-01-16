---

layout:     documentation
title:      "Documentation | eris:cli | eris files cache"

---

# eris files cache

Cache files to IPFS.

## Synopsis

Cache files to IPFS' local daemon.

It caches files locally via IPFS pin, by hash.
Optionally pass in a CSV with: cache --csv=[FILE].

NOTE: "put" will "cache" recursively by default.

```bash
eris files cache HASH
```

## Options

```
      --csv="": specify a .csv with entries of format: HASH,FILE
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris files](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_files/)	 - Manage files needed for your application using IPFS.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

