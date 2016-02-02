---

layout:     documentation
title:      "Documentation | eris:cli | eris services rm"

---

# eris services rm

Remove an installed service.

## Synopsis

Remove an installed service.

Command will remove the service's container but will not remove
the service definition file.

```bash
eris services rm NAME
```

## Options

```
  -x, --data    remove data containers after stopping
      --file    remove service definition file as well as service container
  -f, --force   kill the container instantly without waiting to exit
  -o, --vol     remove volumes (default true)
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

