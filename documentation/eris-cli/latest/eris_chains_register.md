---

layout:     documentation
title:      "Documentation | eris:cli | eris chains register"

---

# eris chains register

Register a blockchain on etcb (a blockchain for registering other blockchains).

## Synopsis

Register a blockchain on etcb.

etcb is Eris's blockchain which is a public blockchain that can be used to
register *other* blockchains. In other words it is an easy way to "share"
your blockchains with others. [eris chains register] is made to work
seemlessly with [eris chains install] so that other users and/or colleagues
should be able to use your registered blockchain by simply using the install
command.

The [eris chains register] command is not the *only* way to 
share your blockchains. You can also export your chain definition file and 
genesis.json to IPFS, and share the hash of the chain definition file and 
genesis.json with any colleagues or users who need to be able to connect 
into the blockchain.

```bash
eris chains register NAME
```

## Options

```
  -e, --env=[]: multiple env vars can be passed using the KEY1:val1,KEY2:val2 syntax
      --etcb-chain="etcb_testnet": set the chain id of the etcb chain
      --etcb-host="interblock.io:46657": set the address of the etcb chain
  -l, --links=[]: multiple containers can be linked using the KEY1:val1,KEY2:val2 syntax
  -p, --pub="": pubkey to use for registering the chain in etcb
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

