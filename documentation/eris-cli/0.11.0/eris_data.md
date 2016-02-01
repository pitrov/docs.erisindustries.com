---

layout:     documentation
title:      "Documentation | eris:cli | eris data"

---

# eris data

Manage data containers for your application.

## Synopsis

The data subcommand is used to import, and export
data into containers for use by your application.

The [eris data import] and [eris data export] commands should be 
thought of from the point of view of the container.

The [eris data import] command sends a directory *as is* from 
SRC on the host to an existing DEST inside of the data container.

The [eris data export] command performs this process in the reverse. 
It sucks out whatever is in the SRC directory in the data container 
and sticks it back into a DEST directory on the host.

Notes: 
- container paths enter at /home/eris/.eris
- import host path must be absolute, export host path is indifferent

At Eris, we use this functionality to formulate little JSONs
and configs on the host and then "stick them back into the
containers"

```bash
eris data
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## Subcommands

* [eris data exec](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data_exec/)	 - Run a command or interactive shell in a data container
* [eris data export](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data_export/)	 - Export a named data container's directory to a host directory
* [eris data import](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data_import/)	 - Import from a host folder to a named data container's directory
* [eris data inspect](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data_inspect/)	 - Show machine readable details.
* [eris data ls](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data_ls/)	 - List the data containers eris manages for you
* [eris data rename](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data_rename/)	 - Rename a data container
* [eris data rm](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data_rm/)	 - Remove a data container

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

