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

## <a name="setVars"></a>Variable Types

If you're using solidity then you will be familiar with variable types. Here is how eris:pm deals with variable types:

* `address` - addresses should be given according to the 40 character string **without** the leading `0x`
  * Example: 1040E6521541DAB4E7EE57F21226DD17CE9F0FB7
* `int` && `uint` -- integers (signed and unsigned) should be given according to their plain text rendering of the digits
  * Example: 99999
* `bool` - `true` or `false`
* `string` and `byteX` -- just give it a string
  * Example: marmatoshi

For a more complete handling of the types, please see the epm.yaml in tests/fixtures/app06 directory of the repository.

## <a name="reservedVars"></a>Reserved Variables

The following are reserved variables:

* `$block`: will return a string version of the current block height
* `$block+X`: where `X` can be any digit; will return a string version of the current block height `+X` blocks
* `$block-X`: where `X` can be any digit; will return a string version of the current block heigh `-X` blocks