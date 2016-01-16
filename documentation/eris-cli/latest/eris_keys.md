---

layout:     documentation
title:      "Documentation | eris:cli | eris keys"

---

# eris keys

Do specific tasks with keys *for dev only*.

## Synopsis

The keys subcommand is an opiniated wrapper around
eris-keys and requires a keys container to be running. 

It is for development only. 
Advanced functionality is available via: [eris services exec keys "eris-keys CMD"]
	
see https://docs.erisindustries.com/documentation/eris-keys/ for more info

```bash
eris keys
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## Subcommands

* [eris keys convert](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_keys_convert/)	 - Convert and eris-keys key to tendermint key
* [eris keys export](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_keys_export/)	 - Export a key from container to host.
* [eris keys gen](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_keys_gen/)	 - Generates an unsafe key using the keys container.
* [eris keys import](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_keys_import/)	 - Import a key to container from host.
* [eris keys pub](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_keys_pub/)	 - Returns a machine readable pubkey given an address.

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

