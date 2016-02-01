---

layout:     documentation
title:      "Documentation | eris:cli | eris services ls"

---

# eris services ls

Lists everything service related.

## Synopsis

Lists all: service definition files (--known), current existing containers
for each service (--existing), and current running containers
for each service (--running).

Known services can be started with the [eris services start NAME] command.
To install a new service, use [eris services import]. Services include
all executable services supported by the Eris platform which are
NOT blockchains or key managers.

Blockchains are handled using the [eris chains] command.

```bash
eris services ls
```

## Options

```
  -e, --existing   list all the all current containers which exist for a service
  -k, --known      list all the service definition files that exist
  -q, --quiet      machine parsable output
  -r, --running    list all the current containers which are running for a service
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## See Also

* [eris services](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services/)	 - Start, stop, and manage services required for your application

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

