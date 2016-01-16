---

layout:     documentation
title:      "Documentation | eris:cli | eris files put"

---

# eris files put

Post files to IPFS.

## Synopsis

Post files to IPFS.

Optionally post all documentations of a directory with: put [dirName] --dir

```bash
eris files put [fileName]
```

## Options

```
      --dir[=false]: add all files from a directory (note: this will not create an ipfs object). returns a log file (ipfs_hashes.csv) to pass into `eris files get`
      --gateway="": specify a hosted gateway. default is IPFS' gateway; type "eris" for our gateway, or use your own with "http://yourhost"
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

