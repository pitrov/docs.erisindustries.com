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
      --csv string   specify a .csv with entries of format: hash,fileName
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## See Also

* [eris files](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_files/)	 - Manage files needed for your application using IPFS.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

