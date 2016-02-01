---

layout:     documentation
title:      "Documentation | eris:cli | eris chains make"

---

# eris chains make

Create keys and a genesis block for your chain.

## Synopsis

Create the new required files for your chain.

Make is an opinionated gateway to the basic types of chains which most eris users
will make most of the time. Make is a command line wizard in which you will let
the marmots know how you would like your genesis created.

Make can also be used with a variety of flags for fast chain making.

When using make with the --known flag the marmots will *not* create keys for you
and will instead assume that the keys exist somewhere. When using make with the
wizard (no flags) or when using with the other flags then keys will be made along
with the genesis.jsons and priv_validator.jsons so that everything is ready to go
for you to [eris chains new].

Optionally chains make provides packages of outputed priv_validator and genesis.json
which you can email or send on your slack to your coworkers. These packages can
be tarballs or zip files, and **they will contain the private keys** so please
be aware of that.

The make process will *not* start a chain for you. You will want to use

[eris chains new chainName --dir chainName]

for that which will import all of the files which make creates into containers and
start your shiny new chain.

If you have any questions on eris chains make, please see the eris-cm (chain manager)
documentation here:
https://docs.erisindustries.com/documentation/eris-cm/latest/eris-cm/


```bash
eris chains make NAME
```

## Examples

```bash
$ eris chains make myChain -- will use the chain-making wizard and make your chain named myChain (interactive)
$ eris chains make myChain --chain-type=simplechain --  will use the chain type definition files to make your chain named myChain (non-interactive)
$ eris chains make myChain --account-types=Root:1,Developer:0,Validator:0,Participant:1 -- will use the flag to make your chain named myChain (non-interactive)
$ eris chains make myChain --account-types=Root:1,Developer:0,Validator:0,Participant:1 --chain-type=simplechain -- account types trump chain types, this command will use the flags to make the chain (non-interactive)
$ eris chains make myChain --known --validators /path/to/validators.csv --accounts /path/to/accounts.csv -- will use the csv file to make your chain named myChain (non-interactive) (won't make keys)
$ eris chains make myChain --tar -- will create the chain and save each of the "bundles" as tarballs which can be used by colleagues to start their chains

```

## Options

```
      --account-types value   what number of account types should we use? find these in ~/.eris/chains/account_types; incompatible with and overrides chain-type (default [])
      --accounts string       comma separated list of the accounts.csv files you would like to utilize (requires --known flag)
      --chain-type string     which chain type definition should we use? find these in ~/.eris/chains/chain_types
  -x, --data                  remove data containers after stopping (default true)
      --known                 use csv for a set of known keys to assemble genesis.json (requires both --accounts and --validators flags
      --output                should eris-cm provide an output of its job (default true)
      --tar                   instead of making directories in ~/.eris/chains, make tarballs; incompatible with and overrides zip
      --validators string     comma separated list of the validators.csv files you would like to utilize (requires --known flag)
      --zip                   instead of making directories in ~/.eris/chains, make zip files
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

