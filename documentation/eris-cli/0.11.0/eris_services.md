---

layout:     documentation
title:      "Documentation | eris:cli | eris services"

---

# eris services

Start, stop, and manage services required for your application

## Synopsis

Start, stop, and manage services required for your application.

Eris services are "things that you turn on or off". They are meant to be long
running microservices on which your application relies. They can be public
blockchains, services your application needs, workers, bridges to other data
or process management systems, or pretty much any process that has a docker
image.

```bash
eris services
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## Subcommands

* [eris services cat](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_cat/)	 - Display the service definition file.
* [eris services edit](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_edit/)	 - Edit a service.
* [eris services exec](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_exec/)	 - Run a command or interactive shell
* [eris services export](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_export/)	 - Export a service definition file to IPFS.
* [eris services import](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_import/)	 - Import a service definition file from IPFS.
* [eris services inspect](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_inspect/)	 - Machine readable service operation details.
* [eris services logs](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_logs/)	 - Display the logs of a running service.
* [eris services ls](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_ls/)	 - Lists everything service related.
* [eris services new](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_new/)	 - Create a new service.
* [eris services ports](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_ports/)	 - Print port mappings
* [eris services rename](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_rename/)	 - Rename an installed service.
* [eris services rm](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_rm/)	 - Remove an installed service.
* [eris services start](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_start/)	 - Start a service.
* [eris services stop](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_stop/)	 - Stop a running service.
* [eris services update](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services_update/)	 - Update an installed service.

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

