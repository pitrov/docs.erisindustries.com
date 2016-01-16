---

layout:     documentation
title:      "Documentation | eris:cli | eris contracts deploy"

---

# eris contracts deploy

Deploy a package of smart contracts to a chain.

## Synopsis

Deploy a package of smart contracts to a chain.

Deployments can be structured using three different
deploy types.

1. embark -- embark dapps can be deployed to an
ethereum style blockchain simply.
2. pyepm -- pyepm contract packages can be deployed
to an ethereum style blockchain.
3. manual -- a simple gulp task can be given to the
deployer.

```bash
eris contracts deploy
```

## Options

```
  -c, --chain="": chain to be used for deployment
  -e, --dest="": working directory to be used for deployment
  -r, --dir="": root directory of dapp (will use $pwd by default)
  -s, --services=[]: comma separated list of services to start
  -k, --task="": gulp task to be ran (overrides package.json; forces --type manual)
  -t, --type="": dapp type paradigm to be used for deployment (overrides package.json)
  -y, --yaml="": yaml file for deployment. pyepm dapps require this; other dapps ignore
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

