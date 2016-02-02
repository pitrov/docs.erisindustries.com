---

layout:     documentation
title:      "Documentation | eris:pm | epm"

---

# epm

The Eris Package Manager Deploys and Tests Smart Contract Systems

## Synopsis

The Eris Package Manager Deploys and Tests Smart Contract Systems

Made with <3 by Eris Industries.

Complete documentation is available at https://docs.erisindustries.com

Version:
  0.11.2

```bash
epm
```

## Options

```
  -a, --abi-path="./abi": path to the abi directory EPM should use when saving ABIs after the compile process; default respects $EPM_ABI_PATH
  -r, --address="": default address to use; operates the same way as the [account] job, only before the epm file is ran; default respects $EPM_ADDRESS
  -u, --amount="9999": default amount to use; default respects $EPM_AMOUNT
  -c, --chain="localhost:46657": <ip:port> of chain which EPM should use; default respects $EPM_CHAIN_ADDR
  -m, --compiler="https://compilers.eris.industries:9090": <ip:port> of compiler which EPM should use; default respects $EPM_COMPILER_ADDR
  -p, --contracts-path="./contracts": path to the contracts EPM should use; default respects $EPM_CONTRACTS_PATH
  -d, --debug[=false]: debug level output; the most output available for epm; if it is too chatty use verbose flag; default respects $EPM_DEBUG
  -n, --fee="1234": default fee to use; default respects $EPM_FEE
  -f, --file="./epm.yaml": path to package file which EPM should use; default respects $EPM_FILE
  -g, --gas="1111111111": default gas to use; can be overridden for any single job; default respects $EPM_GAS
  -o, --output="csv": output format which epm should use [csv,json]; default respects $EPM_OUTPUT_FORMAT
  -e, --set=[]: default sets to use; operates the same way as the [set] jobs, only before the epm file is ran (and after default address; default respects $EPM_SETS
  -s, --sign="localhost:4767": <ip:port> of signer daemon which EPM should use; default respects $EPM_SIGNER_ADDR
  -t, --summary[=true]: output a table summarizing epm jobs; default respects $EPM_SUMMARY_TABLE
  -v, --verbose[=false]: verbose output; more output than no output flags; less output than debug level; default respects $EPM_VERBOSE
```


## Specifications

* [Jobs Specification](https://docs.erisindustries.com/documentation/eris-pm/0.11.2/jobs_specification/)
* [Variable Specification](https://docs.erisindustries.com/documentation/eris-pm/0.11.2/variable_specification/)

