---

layout:     documentation
title:      "Documentation | eris:cli | eris chains start"

---

# eris chains start

Start a blockchain.

## Synopsis

Start running a blockchain.
	
[eris chains start NAME] by default will put the chain into the
background so its logs will not be viewable from the command line.

To stop the chain use:      [eris chains stop NAME].
To view a chain's logs use: [eris chains logs NAME].

```bash
eris chains start
```

## Options

```
  -a, --api[=false]: turn the chain on using erisdb's api
  -e, --env=[]: multiple env vars can be passed using the KEY1=val1,KEY2=val1 syntax
  -l, --links=[]: multiple containers can be linked can be passed using the KEY1:val1,KEY2:val1 syntax
  -p, --publish[=false]: publish random ports
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

