---

layout:     documentation
title:      "Documentation | eris:cli | eris services update"

---

# eris services update

Updates an installed service.

## Synopsis

Updates an installed service, or installs it if it has not been installed.

Functionally this command will perform the following sequence:

1. Stop the service (if it is running)
2. Remove the container which ran the service
3. Pull the image the container uses from a hub
4. Rebuild the container from the updated image
5. Restart the service (if it was previously running)

**NOTE**: If the service uses data containers those will not be affected
by the update command.

```bash
eris services update [name]
```

## Options

```
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val1 syntax
  -l, --links=[]: multiple containers can be linked can be passed using the KEY1:val1,KEY2:val1 syntax
  -p, --pull[=false]: skip the pulling feature and simply rebuild the service container
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

