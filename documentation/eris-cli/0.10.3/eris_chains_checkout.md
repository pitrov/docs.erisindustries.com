---

layout:     documentation
title:      "Documentation | eris:cli | eris chains checkout"

---

# eris chains checkout

Checks out a chain.

## Synopsis

Checks out a chain.

Checkout if a convenience features. For any eris command
which accepts a --chain or $chain variable, the checked
out chain can replace manually passing in a --chain flag.
If a --chain is passed to any command accepting --chain,
the --chain which is passed will overwrite any checked
out chain.

If command is given without arguments it will clear the
head and there will be no chain checked out.


```bash
eris chains checkout
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris chains](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_chains/)	 - Start, Stop, and Manage Blockchains.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

