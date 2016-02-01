---

layout:     documentation
title:      "Documentation | eris:cli | eris chains new"

---

# eris chains new

Create and start a new blockhain.

## Synopsis

Create and start a new blockchain.

The creation process will both create a blockchain on the current machine
as well as start running that chain.

If you need to update a chain after creation, you can update any of the
appropriate settings in the chains definition file for the named chain
(which will be located at ~/.eris/chains/NAME.toml) and then
utilize [eris chains update NAME -p] to update the blockchain appropriately
(using the -p flag will force eris not to pull the most recent docker image
for eris:db).

Will use a default genesis.json from ~/.eris/chains/default/genesis.json
unless a --genesis or --dir flag is passed.

Will use a default config.toml from ~/.eris/chains/default/config.toml
unless the --options or --dir flag is passed.

Will use a default eris:db server config from ~/.eris/chains/default/server_conf.toml
unless the --serverconf or --dir flag is passed.

If you would like to create a genesis.json then please utilize [eris chains make]

```bash
eris chains new NAME
```

## Options

```
  -a, --api           turn the chain on using erisdb's api (default true)
      --dir string    a directory whose contents should be copied into the chain's main dir
  -e, --env value     multiple env vars can be passed using the KEY1=val1,KEY2=val2 syntax (default [])
  -f, --force         overwrite data in  ~/.eris/data/chainName (default true)
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

