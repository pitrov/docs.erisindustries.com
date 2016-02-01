---

layout:     documentation
title:      "Documentation | eris:cli | eris keys convert"

---

# eris keys convert

Convert and eris-keys key to tendermint key

## Synopsis

Convert and eris-keys key to tendermint key

Command is equivalent to [eris services exec keys "mintkey mint ADDR"]

Usually will be piped into $HOME/.eris/chains/newChain/priv_validator.json

```bash
eris keys convert ADDR
```

## Options inherited from parent commands

```
  -d, --debug            debug level output
  -m, --machine string   machine name for docker-machine that is running VM (default "eris")
  -n, --num int          container number (default 1)
  -v, --verbose          verbose output
```

## See Also

* [eris keys](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_keys/)	 - Do specific tasks with keys *for dev only*.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

