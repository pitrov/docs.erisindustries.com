---

layout:     documentation
title:      "Documentation | eris:cli | eris files"

---

# eris files

Manage Files Needed for Your Application Using IPFS.

## Synopsis

The files subcommand is used to import, and export
files to and from IPFS for use on the host machine.

These commands are provided in addition to the various
functionality which is included throughout the tool, such as
services import or services export which operate more
precisely. The eris files command is used as a general wrapper
around an IPFS gateway which would be running as eris services ipfs.

At times, due to the manner in which IPFS boots files commands
will fail. If you get errors when running eris files commands
then please run [eris services start ipfs] give that a second
or two to boot and then retry the eris files command which failed.

```bash
eris files
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## Subcommands

* [eris files cache](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_files_cache/)	 - Cache files to IPFS.
* [eris files cached](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_files_cached/)	 - Lists files cached locally.
* [eris files cat](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_files_cat/)	 - Cat the documentations of a file from IPFS.
* [eris files get](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_files_get/)	 - Pull files from IPFS via a hash and save them locally.
* [eris files ls](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_files_ls/)	 - List links from an IPFS object.
* [eris files put](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_files_put/)	 - Post files to IPFS.

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

