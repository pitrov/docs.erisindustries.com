---

layout:     documentation
title:      "Documentation | eris:cli | eris files get"

---

# eris files get

Pull files from IPFS via a hash and save them locally.

## Synopsis

Pull files from IPFS via a hash and save them locally.

Optionally pass in a CSV with: get --csv=FILE

```bash
eris files get HASH [FILE]
```

## Options

```
      --csv string       specify a .csv with entries of format: hash,fileName
      --dirname string   name of new directory to dump IPFS files from --csv
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

