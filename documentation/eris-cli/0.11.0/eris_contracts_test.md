---

layout:     documentation
title:      "Documentation | eris:cli | eris contracts test"

---

# eris contracts test

Test a package of smart contracts.

## Synopsis

Test a package of smart contracts.

Tests can be structured using three different
test types.

1. epm - epm apps can be tested against tendermint style blockchains.
2. embark - embark apps can be tested against ethereum style blockchains.
3. truffle - HELP WANTED!
4. solUnit - pure solidity smart contract packages may be tested via solUnit test framework.
5. manual - a simple gulp task can be given to the test environment.

```bash
eris contracts test
```

## Options

```
  -b, --abi-path="./abi": path to the abi directory EPM should use when saving ABIs after the compile process (EPM only)
  -a, --address="": default address to use; operates the same way as the [account] job, only before the epm file is ran (EPM only)
  -y, --amount="9999": default amount to use (EPM only)
  -c, --chain="": chain to be used for testing
  -l, --compiler="https://compilers.eris.industries:9090": <ip:port> of compiler which EPM should use (EPM only)
  -p, --contracts-path="./contracts": path to the contracts EPM should use (EPM only)
  -i, --dir="": root directory of app (will use $pwd by default)
  -w, --fee="1234": default fee to use (EPM only)
  -f, --file="./epm.yaml": path to package file which EPM should use (EPM only)
  -g, --gas="1111111111": default gas to use; can be overridden for any single job (EPM only)
  -o, --output="": results output type (EPM only)
  -r, --rm[=true]: remove containers after stopping
  -x, --rm-data[=true]: remove artifacts from host
  -s, --services=[]: comma separated list of services to start
  -e, --set=[]: default sets to use; operates the same way as the [set] jobs, only before the epm file is ran (and after default address (EPM only)
  -u, --summary[=true]: output a table summarizing epm jobs (EPM only)
  -k, --task="": gulp task to be ran (overrides package.json; forces --type manual)
  -t, --type="mint": app type paradigm to be used for testing (overrides package.json)
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris contracts](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_contracts/)	 - Deploy, Test, and Manage Your Smart Contracts.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

