---

layout:     documentation
title:      "Documentation | eris:chain_manager | eris-cm make"

---

# eris-cm make

The Eris Chain Maker is a utility for easily creating the files necessary to build eris chains

## Synopsis

The Eris Chain Maker is a utility for easily creating the files necessary to build eris chains.

```bash
eris-cm make
```

## Examples

```bash
$ eris-cm make myChain -- will use the chain-making wizard and make your chain named myChain using eris-keys defaults (available via localhost) (interactive)
$ eris-cm make myChain --chain-type=simplechain --  will use the chain type definition files to make your chain named myChain using eris-keys defaults (non-interactive)
$ eris-cm make myChain --account-types=Root:1,Developer:0,Validator:0,Participant:1 -- will use the flag to make your chain named myChain using eris-keys defaults (non-interactive)
$ eris-cm make myChain --account-types=Root:1,Developer:0,Validator:0,Participant:1 --chain-type=simplechain -- account types trump chain types, this command will use the flags to make the chain (non-interactive)
$ eris-cm make myChain --csv /path/to/csv -- will use the csv file to make your chain named myChain using eris-keys defaults (non-interactive)
```

## Options

```
  -t, --account-types=[]: what number of account types should we use? find these in ~/.eris/chains/account_types; incompatible with and overrides chain-type; default respects $ERIS_CHAINMANAGER_ACCOUNTTYPES
  -c, --chain-type="": which chain type definition should we use? find these in ~/.eris/chains/chain_types; default respects $ERIS_CHAINMANAGER_CHAINTYPE
  -s, --csv-file="": csv file in the form `account-type,number,tokens,toBond,perms; default respects $ERIS_CHAINMANAGER_CSVFILE
  -k, --keys-server="http://localhost:4767": keys server which should be used to generate keys; default respects $ERIS_KEYS_PATH
  -r, --tar[=false]: instead of making directories in ~/.chains, make tarballs; incompatible with and overrides zip; default respects $ERIS_CHAINMANAGER_TARBALLS
  -z, --zip[=false]: instead of making directories in ~/.chains, make zip files; default respects $ERIS_CHAINMANAGER_ZIPFILES
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output; the most output available for eris-cm; if it is too chatty use verbose flag; default respects $ERIS_CHAINMANAGER_DEBUG
  -o, --output[=true]: should eris-cm provide an output of its job; default respects $ERIS_CHAINMANAGER_OUTPUT
  -v, --verbose[=false]: verbose output; more output than no output flags; less output than debug level; default respects $ERIS_CHAINMANAGER_VERBOSE
```

## See Also

* [eris-cm](https://docs.erisindustries.com/documentation/eris-cm/0.11.3/eris-cm/)	 - The Eris Chain Manager is a utility for performing complex operations on eris chains

## Specifications

* [Account Types](https://docs.erisindustries.com/documentation/eris-cm/0.11.3/account_types/)
* [Chain Types](https://docs.erisindustries.com/documentation/eris-cm/0.11.3/chain_types/)

