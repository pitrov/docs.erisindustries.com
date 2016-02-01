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
  -a, --api           turn the chain on using erisdb's api (default true)
  -e, --env value     multiple env vars can be passed using the KEY1=val1,KEY2=val2 syntax (default [])
  -l, --links value   multiple containers can be linked can be passed using the KEY1:val1,KEY2:val2 syntax (default [])
  -z, --logsrotate    turn on logsrotate as a dependency to handle long output (default true)
  -p, --publish       publish random ports
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

