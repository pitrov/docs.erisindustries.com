---

layout:     documentation
title:      "Documentation | eris:cli | eris chains stop"

---

# eris chains stop

Stop a running blockchain.

## Synopsis

Stop a running blockchain.

```bash
eris chains stop NAME
```

## Options

```
  -x, --data[=false]: remove data containers after stopping
  -f, --force[=false]: kill the container instantly without waiting to exit
  -r, --rm[=false]: remove containers after stopping
  -t, --timeout=10: manually set the timeout; can be overridden by --force
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

* [eris chains](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_chains/)	 - Start, stop, and manage blockchains.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

