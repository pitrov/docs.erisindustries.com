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

1. embark -- embark dapps can be tested against
ethereum style chains.
2. solUnit -- pure solidity smart contract packages
may be tested via solUnit test framework.
3. manual -- a simple gulp task can be given to the
test environment.

```bash
eris contracts test
```

## Options

```
  -c, --chain="": chain to be used for testing
  -e, --dest="": working directory to be used for testing
  -r, --dir="": root directory of dapp (will use $pwd by default)
  -s, --services=[]: comma separated list of services to start
  -k, --task="": gulp task to be ran (overrides package.json; forces --type manual)
  -t, --type="": dapp type paradigm to be used for testing (overrides package.json)
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
      --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris contracts](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_contracts/)	 - Deploy, Test, and Manage Your Smart Contracts.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_specification/)

