---

layout:     documentation
title:      "Documentation | eris:cli | eris keys import"

---

# eris keys import

Import a key to container from host.

## Synopsis

Import a key to container from host.

Takes a key from $HOME/user/.eris/keys/data/ADDR/ADDR
on the host and copies it to /home/eris/.eris/keys/data/ADDR/ADDR
in the keys container.

```bash
eris keys import ADDR
```

## Options

```
      --addr string   address of key to import
      --src string    source on host to import from. give full filepath to key (default "/home/ubuntu/.eris/keys/data")
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

