---

layout:     documentation
title:      "Documentation | eris:pm | Jobs Specification"

---

# Jobs Specification

Jobs are defined in **epm definition files**.

Action definition files may be formatted in any of the following formats:

* `json`
* `toml`
* `yaml` (default)

Examples of epm definition files are available in the [`tests/fixtures` directory](https://github.com/eris-ltd/eris-pm/tree/master/tests/fixtures).

Each job will perform its required action and then it will save the result of its job in a variable which can be utilized by jobs later in the sequence using eris:pm's [variable specification](../variable_specification).

# Jobs

Jobs are performed as sequentially based on the order they are given in the epm definition file. By default EPM will perform the entire sequence of jobs which has been outlined in a given jobs file.

Job categories are categorize into:

* [transaction jobs](#txJobs);
* [contracts jobs](#contractsJobs);
* [test jobs](#testJobs); and
* [other jobs](#otherJobs).

For each job which is specified, EPM will parse the following information:

```go
type Jobs struct {
  // Name of the job
  JobName   string `mapstructure:"name" json:"name" yaml:"name" toml:"name"`
  // Type of the job. should be one of the strings outlined in the job struct (below)
  Job       *Job   `mapstructure:"job" json:"job" yaml:"job" toml:"job"`
  // Not marshalled
  JobResult string
}
```

Each job must then specify one **and only one** key which will determine the `type` of job which eris:pm should run. It is not invalid to add additional jobs, but only one of the jobs will be ran by eris:pm. The jobs and their purposes are outlined in the Job struct.

```go
type Job struct {
  // Sets/Resets the primary account to use
  Account *Account `mapstructure:"account" json:"account" yaml:"account" toml:"account"`
  // Set an arbitrary value
  Set *Set `mapstructure:"set" json:"set" yaml:"set" toml:"set"`
  // Contract compile and send to the chain functions
  Deploy *Deploy `mapstructure:"deploy" json:"deploy" yaml:"deploy" toml:"deploy"`
  // @dennismckinnon working on this
  PackageDeploy *PackageDeploy `mapstructure:"package-deploy" json:"package-deploy" yaml:"package-deploy" toml:"package-deploy"`
  // Send tokens from one account to another
  Send *Send `mapstructure:"send" json:"send" yaml:"send" toml:"send"`
  // Utilize eris:db's native name registry to register a name
  RegisterName *RegisterName `mapstructure:"register" json:"register" yaml:"register" toml:"register"`
  // Sends a transaction which will update the permissions of an account. Must be sent from an account which
  // has root permissions on the blockchain (as set by either the genesis.json or in a subsequence transaction)
  Permission *Permission `mapstructure:"permission" json:"permission" yaml:"permission" toml:"permission"`
  // Sends a bond transaction
  Bond *Bond `mapstructure:"bond" json:"bond" yaml:"bond" toml:"bond"`
  // Sends an unbond transaction
  Unbond *Unbond `mapstructure:"unbond" json:"unbond" yaml:"unbond" toml:"unbond"`
  // Sends a rebond transaction
  Rebond *Rebond `mapstructure:"rebond" json:"rebond" yaml:"rebond" toml:"rebond"`
  // Sends a transaction to a contract. Will utilize eris-abi under the hood to perform all of the heavy lifting
  Call *Call `mapstructure:"call" json:"call" yaml:"call" toml:"call"`
  // Wrapper for mintdump dump. WIP
  DumpState *DumpState `mapstructure:"dump-state" json:"dump-state" yaml:"dump-state" toml:"dump-state"`
  // Wrapper for mintdum restore. WIP
  RestoreState *RestoreState `mapstructure:"restore-state" json:"restore-state" yaml:"restore-state" toml:"restore-state"`
  // Sends a "simulated call" to a contract. Predominantly used for accessor functions ("Getters" within contracts)
  QueryContract *QueryContract `mapstructure:"query-contract" json:"query-contract" yaml:"query-contract" toml:"query-contract"`
  // Queries information from an account.
  QueryAccount *QueryAccount `mapstructure:"query-account" json:"query-account" yaml:"query-account" toml:"query-account"`
  // Queries information about a name registered with eris:db's native name registry
  QueryName *QueryName `mapstructure:"query-name" json:"query-name" yaml:"query-name" toml:"query-name"`
  // Queries information about the validator set
  QueryVals *QueryVals `mapstructure:"query-vals" json:"query-vals" yaml:"query-vals" toml:"query-vals"`
  // Makes and assertion (useful for testing purposes)
  Assert *Assert `mapstructure:"assert" json:"assert" yaml:"assert" toml:"assert"`
}
```

## <a name="txJobs"></a>Transaction Jobs

Transaction jobs exposed through eris:pm are available in the following job types:

* [send](#sendJob): a transaction which sends tokens from one account to another
* [register](#registerJob): register a name in the native name registry
* [permission](#permJob): update an account's permissions or roles (must be sent from an account which has root permissions on the chain)
* [bond](#bondJob): a bonding transaction ("make me a part of the validator pool")
* [unbond](#unbondJob): an unbonding transaction ("I want to leave the validator pool")
* [rebond](#rebondJob): a rebonding transaction ("oops. I actually don't want to leave the validator pool. Please add me back.")

### <a name="sendJob"></a>Send Jobs

The send job will parse the following information:

```go
// Send *Send `mapstructure:"send" json:"send" yaml:"send" toml:"send"`
type Send struct {
  // (Optional, if account job or global account set) address of the account from which to send (the
  // public key for the account must be available to eris-keys)
  Source string `mapstructure:"source" json:"source" yaml:"source" toml:"source"`
  // (Required) address of the account to send the tokens
  Destination string `mapstructure:"destination" json:"destination" yaml:"destination" toml:"destination"`
  // (Required) amount of tokens to send from the `source` to the `destination`
  Amount string `mapstructure:"amount" json:"amount" yaml:"amount" toml:"amount"`
  // (Optional, advanced only) nonce to use when eris-keys signs the transaction (do not use unless you
  // know what you're doing)
  Nonce string `mapstructure:"nonce" json:"nonce" yaml:"nonce" toml:"nonce"`
  // (Optional) wait for the transaction to be confirmed in the blockchain before proceeding
  Wait bool `mapstructure:"wait" json:"wait" yaml:"wait" toml:"wait"`
}
```

### <a name="registerJob"></a>Register Jobs

The register job will parse the following information:

```go
// RegisterName *RegisterName `mapstructure:"register" json:"register" yaml:"register" toml:"register"`
type RegisterName struct {
  // (Optional, if account job or global account set) address of the account from which to send (the
  // public key for the account must be available to eris-keys)
  Source string `mapstructure:"source" json:"source" yaml:"source" toml:"source"`
  // (Required) name which will be registered
  Name string `mapstructure:"name" json:"name" yaml:"name" toml:"name"`
  // (Optional, if data_file is used; otherwise required) data which will be stored at the `name` key
  Data string `mapstructure:"data" json:"data" yaml:"data" toml:"data"`
  // (Optional) csv file in the form (name,data[,amount]) which can be used to bulk register names
  DataFile string `mapstructure:"data_file" json:"data_file" yaml:"data_file" toml:"data_file"`
  // (Optional) amount of blocks which the name entry will be reserved for the registering user
  Amount string `mapstructure:"amount" json:"amount" yaml:"amount" toml:"amount"`
  // (Optional) validators' fee
  Fee string `mapstructure:"fee" json:"fee" yaml:"fee" toml:"fee"`
  // (Optional, advanced only) nonce to use when eris-keys signs the transaction (do not use unless you
  // know what you're doing)
  Nonce string `mapstructure:"nonce" json:"nonce" yaml:"nonce" toml:"nonce"`
  // (Optional) wait for the transaction to be confirmed in the blockchain before proceeding
  Wait bool `mapstructure:"wait" json:"wait" yaml:"wait" toml:"wait"`
}
```

### <a name="permJob"></a>Permission Jobs

The permission job will parse the following information:

```go
// Permission *Permission `mapstructure:"permission" json:"permission" yaml:"permission" toml:"permission"`
type Permission struct {
  // (Optional, if account job or global account set) address of the account from which to send (the
  // public key for the account must be available to eris-keys)
  Source string `mapstructure:"source" json:"source" yaml:"source" toml:"source"`
  // (Required) actions must be in the set ["set_base", "unset_base", "set_global", "add_role" "rm_role"]
  Action string `mapstructure:"action" json:"action" yaml:"action" toml:"action"`
  // (Required, unless add_role or rm_role action selected) the name of the permission flag which is to
  // be updated
  PermissionFlag string `mapstructure:"permission" json:"permission" yaml:"permission" toml:"permission"`
  // (Required) the value of the permission or role which is to be updated
  Value string `mapstructure:"value" json:"value" yaml:"value" toml:"value"`
  // (Required) the target account which is to be updated
  Target string `mapstructure:"target" json:"target" yaml:"target" toml:"target"`
  // (Required, if add_role or rm_role action selected) the role which should be given to the account
  Role string `mapstructure:"role" json:"role" yaml:"role" toml:"role"`
  // (Optional, advanced only) nonce to use when eris-keys signs the transaction (do not use unless you
  // know what you're doing)
  Nonce string `mapstructure:"nonce" json:"nonce" yaml:"nonce" toml:"nonce"`
  // (Optional) wait for the transaction to be confirmed in the blockchain before proceeding
  Wait bool `mapstructure:"wait" json:"wait" yaml:"wait" toml:"wait"`
}
```

### <a name="bondJob"></a>Bond Jobs

The bond job will parse the following information:

```go
// Bond *Bond `mapstructure:"bond" json:"bond" yaml:"bond" toml:"bond"`
type Bond struct {
  // (Required) public key of the address which will be bonded
  PublicKey string `mapstructure:"pub_key" json:"pub_key" yaml:"pub_key" toml:"pub_key"`
  // (Required) address of the account which will be bonded
  Account string `mapstructure:"account" json:"account" yaml:"account" toml:"account"`
  // (Required) amount of tokens which will be bonded
  Amount string `mapstructure:"amount" json:"amount" yaml:"amount" toml:"amount"`
  // (Optional, advanced only) nonce to use when eris-keys signs the transaction (do not use unless you
  // know what you're doing)
  Nonce string `mapstructure:"nonce" json:"nonce" yaml:"nonce" toml:"nonce"`
  // (Optional) wait for the transaction to be confirmed in the blockchain before proceeding
  Wait bool `mapstructure:"wait" json:"wait" yaml:"wait" toml:"wait"`
}
```

### <a name="unbondJob"></a>Unbond Jobs

The unbond job will parse the following information:

```go
// Unbond *Unbond `mapstructure:"unbond" json:"unbond" yaml:"unbond" toml:"unbond"`
type Unbond struct {
  // (Required) address of the account which to unbond
  Account string `mapstructure:"account" json:"account" yaml:"account" toml:"account"`
  // (Required) block on which the unbonding will take place (users may unbond at any
  // time >= currentBlock)
  Height string `mapstructure:"height" json:"height" yaml:"height" toml:"height"`
  // (Optional) wait for the transaction to be confirmed in the blockchain before proceeding
  Wait bool `mapstructure:"wait" json:"wait" yaml:"wait" toml:"wait"`
}
```

### <a name="rebondJob"></a>Rebond Jobs

The rebond job will parse the following information:

```go
// Rebond *Rebond `mapstructure:"rebond" json:"rebond" yaml:"rebond" toml:"rebond"`
type Rebond struct {
  // (Required) address of the account which to rebond
  Account string `mapstructure:"account" json:"account" yaml:"account" toml:"account"`
  // (Required) block on which the rebonding will take place (users may rebond at any
  // time >= (unbondBlock || currentBlock))
  Height string `mapstructure:"height" json:"height" yaml:"height" toml:"height"`
  // (Optional) wait for the transaction to be confirmed in the blockchain before proceeding
  Wait bool `mapstructure:"wait" json:"wait" yaml:"wait" toml:"wait"`
}
```

## <a name="contractsJobs"></a>Contracts Jobs

Contracts jobs exposed through eris:pm are available in the following job types:

* [deploy](#deployJob): deploy a single contract
* [call](#callJob): send a transaction to a contract (can only be sent to existing contracts)

### <a name="deployJob"></a>Deploy Jobs

The deploy job will parse the following information:

```go
type Deploy struct {
  // (Optional, if account job or global account set) address of the account from which to send (the
  // public key for the account must be available to eris-keys)
  Source string `mapstructure:"source" json:"source" yaml:"source" toml:"source"`
  // (Required) the filepath to the contract file. this should be relative to the current path **or**
  // relative to the contracts path established via the --contracts-path flag or the $EPM_CONTRACTS_PATH
  // environment variable
  Contract string `mapstructure:"contract" json:"contract" yaml:"contract" toml:"contract"`
  // (Optional) additional arguments to send along with the contract code
  Data string `mapstructure:"data" json:"data" yaml:"data" toml:"data"`
  // (Optional) amount of tokens to send to the contract which will (after deployment) reside in the
  // contract's account
  Amount string `mapstructure:"amount" json:"amount" yaml:"amount" toml:"amount"`
  // (Optional) validators' fee
  Fee string `mapstructure:"fee" json:"fee" yaml:"fee" toml:"fee"`
  // (Optional) amount of gas which should be sent along with the contract deployment transaction
  Gas string `mapstructure:"gas" json:"gas" yaml:"gas" toml:"gas"`
  // (Optional, advanced only) nonce to use when eris-keys signs the transaction (do not use unless you
  // know what you're doing)
  Nonce string `mapstructure:"nonce" json:"nonce" yaml:"nonce" toml:"nonce"`
  // (Optional) wait for the transaction to be confirmed in the blockchain before proceeding
  Wait bool `mapstructure:"wait" json:"wait" yaml:"wait" toml:"wait"`
}
```

### <a name="callJob"></a>Call Jobs

The call job will parse the following information:

```go
type Call struct {
  // (Optional, if account job or global account set) address of the account from which to send (the
  // public key for the account must be available to eris-keys)
  Source string `mapstructure:"source" json:"source" yaml:"source" toml:"source"`
  // (Required) address of the contract which should be called
  Destination string `mapstructure:"destination" json:"destination" yaml:"destination" toml:"destination"`
  // (Required) data which should be called. will use the eris-abi tooling under the hood to formalize the
  // transaction
  Data string `mapstructure:"data" json:"data" yaml:"data" toml:"data"`
  // (Optional) amount of tokens to send to the contract
  Amount string `mapstructure:"amount" json:"amount" yaml:"amount" toml:"amount"`
  // (Optional) validators' fee
  Fee string `mapstructure:"fee" json:"fee" yaml:"fee" toml:"fee"`
  // (Optional) amount of gas which should be sent along with the call transaction
  Gas string `mapstructure:"gas" json:"gas" yaml:"gas" toml:"gas"`
  // (Optional, advanced only) nonce to use when eris-keys signs the transaction (do not use unless you
  // know what you're doing)
  Nonce string `mapstructure:"nonce" json:"nonce" yaml:"nonce" toml:"nonce"`
  // (Optional) wait for the transaction to be confirmed in the blockchain before proceeding
  Wait bool `mapstructure:"wait" json:"wait" yaml:"wait" toml:"wait"`
}
```
## <a name="testJobs"></a>Test Jobs

Test jobs exposed through eris:pm are available in the following job types:

* [query-account](#queryAccountJob): get information about an account on the blockchain
* [query-contract](#queryContractJob): perform a simulated call against a specific contract (usually used to trigger accessor functions which retrieve information from a return variable of a contract's function)
* [query-name](#queryNameJob): get information about a registered name using eris:db's name registry functionaltiy
* [query-vals](#queryValsJob): get information about the validator set
* [assert](#assertJob): assert a relationship between a key and a value (useful for testing purposes to make sure everything deployed properly and/or is working as it should)

### <a name="queryAccountJob"></a>QueryAccount Jobs

The query-account job will parse the following information:

```go
// QueryAccount *QueryAccount `mapstructure:"query-account" json:"query-account" yaml:"query-account" toml:"query-account"`
type QueryAccount struct {
  // (Required) address of the account which should be queried
  Account string `mapstructure:"account" json:"account" yaml:"account" toml:"account"`
  // (Required) field which should be queried. If users are trying to query the permissions of the
  // account one can get either the `permissions.base` which will return the base permission of the
  // account, or one can get the `permissions.set` which will return the setBit of the account.
  Field string `mapstructure:"field" json:"field" yaml:"field" toml:"field"`
}
```

### <a name="queryContractJob"></a>QueryContract Jobs

The query-contract job will parse the following information:

```go
// QueryContract *QueryContract `mapstructure:"query-contract" json:"query-contract" yaml:"query-contract" toml:"query-contract"`
// aka. Simulated Call.
type QueryContract struct {
  // (Optional, if account job or global account set) address of the account from which to send (the
  // public key for the account must be available to eris-keys)
  Source string `mapstructure:"source" json:"source" yaml:"source" toml:"source"`
  // (Required) address of the contract which should be called
  Destination string `mapstructure:"destination" json:"destination" yaml:"destination" toml:"destination"`
  // (Required) data which should be called. will use the eris-abi tooling under the hood to formalize the
  // transaction. QueryContract will usually be used with "accessor" functions in contracts
  Data string `mapstructure:"data" json:"data" yaml:"data" toml:"data"`
}
```

### <a name="queryNameJob"></a>QueryName Jobs

The query-name job will parse the following information:

```go
// QueryName *QueryName `mapstructure:"query-name" json:"query-name" yaml:"query-name" toml:"query-name"`
type QueryName struct {
  // (Required) name which should be queried
  Name string `mapstructure:"name" json:"name" yaml:"name" toml:"name"`
  // (Required) field which should be quiried (generally will be "data" to get the registered "name")
  Field string `mapstructure:"field" json:"field" yaml:"field" toml:"field"`
}
```

### <a name="queryValsJob"></a>QueryVals Jobs

The query-vals job will parse the following information:

```go
// QueryVals *QueryVals `mapstructure:"query-vals" json:"query-vals" yaml:"query-vals" toml:"query-vals"`
type QueryVals struct {
  // (Required) should be of the set ["bonded_validators" or "unbonding_validators"] and it will
  // return a comma separated listing of the addresses which fall into one of those categories
  Field string `mapstructure:"field" json:"field" yaml:"field" toml:"field"`
}
```

### <a name="assertJob"></a>Assert Jobs

The assert job will parse the following information:

```go
// Assert *Assert `mapstructure:"assert" json:"assert" yaml:"assert" toml:"assert"`
type Assert struct {
  // (Required) key which should be used for the assertion. This is usually known as the "expected"
  // value in most testing suites
  Key string `mapstructure:"key" json:"key" yaml:"key" toml:"key"`
  // (Required) must be of the set ["eq", "ne", "ge", "gt", "le", "lt", "==", "!=", ">=", ">", "<=", "<"]
  // establishes the relation to be tested by the assertion. If a strings key:value pair is being used
  // only the equals or not-equals relations may be used as the key:value will try to be converted to
  // ints for the remainder of the relations. if strings are passed to them then eris:pm will return an
  // error
  Relation string `mapstructure:"relation" json:"relation" yaml:"relation" toml:"relation"`
  // (Required) value which should be used for the assertion. This is usually known as the "given"
  // value in most testing suites. Generally it will be a variable expansion from one of the query
  // jobs.
  Value string `mapstructure:"val" json:"val" yaml:"val" toml:"val"`
}
```

## <a name="otherJobs"></a>Other Jobs

Other jobs exposed through eris:pm are available in the following job types:

* [account](#accountJob): set the account to use
* [set](#setJob): set the value of a variable

### <a name="accountJob"></a>Account Jobs

The account job will parse the following information:

```go
// Account *Account `mapstructure:"account" json:"account" yaml:"account" toml:"account"`
type Account struct {
  // (Required) address of the account which should be used as the default (if source) is
  // not given for future transactions. Will make sure the eris-keys has the public key
  // for the account. Generally account should be the first job called unless it is used
  // via a flag or environment variables to establish what default to use.
  Address string `mapstructure:"address" json:"address" yaml:"address" toml:"address"`
}
```

### <a name="setJob"></a>Set Jobs

The set job will parse the following information:

```go
// Set *Set `mapstructure:"set" json:"set" yaml:"set" toml:"set"`
type Set struct {
  // (Required) value which should be saved along with the jobName (which will be the key)
  // this is useful to set variables which can be used throughout the epm definition file
  Value string `mapstructure:"val" json:"val" yaml:"val" toml:"val"`
}
```