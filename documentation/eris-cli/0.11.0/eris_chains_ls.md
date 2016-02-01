---

layout:     documentation
title:      "Documentation | eris:cli | eris chains ls"

---

# eris chains ls

Lists everything chain related.

## Synopsis

Lists all: chain definition files (--known), current existing
containers for each chain (--existing), current running containers for each
chain (--running).

If no known chains exist yet, create a new blockchain with: [eris chains new NAME]
command.

Services are handled using the [eris services] command.

```bash
eris chains ls
```

## Options

```
  -e, --existing   list all the all current containers which exist for a chain
  -k, --known      list all the chain definition files that exist
  -q, --quiet      machine parsable output
  -r, --running    list all the current containers which are running for a chain
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## See Also

* [eris chains](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_chains/)	 - Start, stop, and manage blockchains.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

