---

layout:     documentation
title:      "Documentation | eris:cli | eris chains update"

---

# eris chains update

Update an installed chain.

## Synopsis

Update an installed chain, or install it if it has not been installed.

Functionally this command will perform the following sequence:

1. Stop the chain (if it is running).
2. Remove the container which ran the chain.
3. Pull the image the container uses from a hub.
4. Rebuild the container from the updated image.
5. Restart the chain (if it was previously running).

NOTE: If the chain uses data containers those will not be affected
by the update command.


```bash
eris chains update NAME
```

## Options

```
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val2 syntax
  -l, --links=[]: multiple containers can be linked can be passed using the KEY1:val1,KEY2:val2 syntax
  -p, --pull[=true]: pull an updated version of the chain's base service image from docker hub
  -t, --timeout=10: manually set the timeout; can be overridden by --force
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

