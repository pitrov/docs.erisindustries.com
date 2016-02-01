---

layout:     documentation
title:      "Documentation | eris:cli | eris services inspect"

---

# eris services inspect

Machine readable service operation details.

## Synopsis

Display machine readable details about running containers.

Information available to the inspect command is provided by the Docker API.
For more information about return values, see:
https://github.com/fsouza/go-dockerclient/blob/master/container.go#L235

```bash
eris services inspect NAME [KEY]
```

## Examples

```bash
$ eris services inspect ipfs -- will display the entire information about ipfs containers
$ eris services inspect ipfs name -- will display the name in machine readable format
$ eris services inspect ipfs host_config.binds -- will display only that value
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

