---

layout:     documentation
title:      "Documentation | eris:cli | eris services stop"

---

# eris services stop

Stop a running service.

## Synopsis

Stop a service which is currently running.

```bash
eris services stop NAME
```

## Options

```
  -a, --all            stop the primary service and its dependent services
  -c, --chain string   specify a chain the service should also stop
  -x, --data           remove data containers after stopping
  -f, --force          kill the container instantly without waiting to exit
  -r, --rm             remove containers after stopping
  -t, --timeout uint   manually set the timeout; overridden by --force (default 10)
  -o, --vol            remove volumes
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

