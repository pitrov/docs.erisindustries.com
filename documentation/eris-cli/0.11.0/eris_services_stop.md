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
  -a, --all[=false]: stop the primary service and its dependent services
  -c, --chain="": specify a chain the service should also stop
  -x, --data[=false]: remove data containers after stopping
  -f, --force[=false]: kill the container instantly without waiting to exit
  -r, --rm[=false]: remove containers after stopping
  -t, --timeout=10: manually set the timeout; overridden by --force
  -o, --vol[=false]: remove volumes
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris services](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_services/)	 - Start, stop, and manage services required for your application.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

