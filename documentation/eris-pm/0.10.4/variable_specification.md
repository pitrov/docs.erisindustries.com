---

layout:     documentation
title:      "Documentation | eris:pm | Variable Specification"

---

# Variables Specification

Variables can be used for nearly every epm [jobs](../jobs_specification) field (largely with the exception of nonce and wait).

eris:pm variables will always begin with a dollar sign `$`. This is what will trigger the variable expansion.

Variables come in the following types:

* [job result variables](#jobResultVars)
* [set variables](#setVars)
* [reserved variables](#reservedVars)

## <a name="jobResultVars"></a>Job Result Variable

The result of every job is set as a variable with the `JobName` as the key and the `JobResult` as the value. The `JobResult` for transaction jobs is the transaction hash. The `JobResult`  for contract deployments is the address of the contract. The `JobResult` for queries and calls is the return value from the blockchain or the query.

The `JobResults` which are able to be retrieved from query functions will vary and depend largely on the fields which are returnable from mint-client's tooling.

## <a name="setVars"></a>Set Variables

Set variables will take the `JobName` and use the `val` field from the epm file to set the variable.

## <a name="reservedVars"></a>Reserved Variables

The following are reserved variables:

* `$block`: will return a string version of the current block height
* `$block+X`: where `X` can be any digit; will return a string version of the current block height `+X` blocks
* `$block-X`: where `X` can be any digit; will return a string version of the current block heigh `-X` blocks