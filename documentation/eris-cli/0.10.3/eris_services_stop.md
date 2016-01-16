---

layout:     documentation
title:      "Documentation | eris:cli | eris services stop"

---

# eris services stop

Stops a running service.

## Synopsis

Stops a service which is currently running.

```bash
eris services stop [name]
```

## Options

```
  -a, --all[=false]: stop the primary service and its dependent services
  -c, --chain="": specify a chain the service should also stop
  -x, --data[=false]: remove data containers after stopping
  -f, --force[=false]: kill the container instantly without waiting to exit
  -r, --rm[=false]: remove containers after stopping
  -t, --timeout=10: manually set the timeout; overridden by --force
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris services](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_services/)	 - Start, Stop, and Manage Services Required for your Application.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

