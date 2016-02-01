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
  -e, --env value      multiple env vars can be passed using the KEY1=val1,KEY2=val2 syntax (default [])
  -l, --links value    multiple containers can be linked can be passed using the KEY1:val1,KEY2:val2 syntax (default [])
  -p, --pull           pull an updated version of the chain's base service image from docker hub
  -t, --timeout uint   manually set the timeout; overridden by --force (default 10)
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

