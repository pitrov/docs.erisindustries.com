---

layout:     documentation
title:      "Documentation | eris:cli | eris services start"

---

# eris services start

Start a service.

## Synopsis

Start a service according to the service definition file which
eris stores in the ~/.eris/services directory.

The [eris services start NAME] command by default will put the
service into the background so its logs will not be viewable
from the command line.

To stop the service use:      [eris services stop NAME].
To view a service's logs use: [eris services logs NAME].

```bash
eris services start NAME
```

## Options

```
  -c, --chain string   specify a chain the service depends on
  -e, --env value      multiple env vars can be passed using the KEY1=val1,KEY2=val2 syntax (default [])
  -l, --links value    multiple containers can be linked can be passed using the KEY1:val1,KEY2:val2 syntax (default [])
  -p, --publish        publish random ports
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

