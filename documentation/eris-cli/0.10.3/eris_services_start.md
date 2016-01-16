---

layout:     documentation
title:      "Documentation | eris:cli | eris services start"

---

# eris services start

Start a service.

## Synopsis

Starts a service according to the service definition file which
eris stores in the ~/.eris/services directory.

[eris services start name] by default will put the service into the
background so its logs will not be viewable from the command line.

To stop the service use:      [eris services stop serviceName].
To view a service's logs use: [eris services logs serviceName].

```bash
eris services start [name]
```

## Options

```
  -c, --chain="": specify a chain the service depends on
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val1 syntax
  -l, --links=[]: multiple containers can be linked can be passed using the KEY1:val1,KEY2:val1 syntax
  -p, --publish[=false]: publish random ports
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

