---

layout:     documentation
title:      "Documentation | eris:cli | Chains Specification"

---

# Chains Specification

Chains are defined in **chain definition files**. These reside on the host in `~/.eris/chains`.

Chain definition files may be formatted in any of the following formats:

* `json`
* `toml` (default)
* `yaml`

eris will marshal the following fields from chain definition files:

```go
// name of the chain
Name string `json:"name" yaml:"name" toml:"name"`
// chain_id of the chain
ChainID string `mapstructure:"chain_id" json:"chain_id" yaml:"chain_id" toml:"chain_id"`
// type of the chain
ChainType string `mapstructure:"chain_type" json:"chain_type" yaml:"chain_type" toml:"chain_type"`

// same fields as in the Service Struct/Service Specification
Service    *Service    `json:"service,omitempty" yaml:"service,omitempty" toml:"service,omitempty"`
Maintainer *Maintainer `json:"maintainer,omitempty" yaml:"maintainer,omitempty" toml:"maintainer,omitempty"`
Location   *Location   `json:"location,omitempty" yaml:"location,omitempty" toml:"location,omitempty"`
Machine    *Machine    `json:"machine,omitempty" yaml:"machine,omitempty" toml:"machine,omitempty"`
```

# ECM Specification

The Eris Chain Manager (ECM) is a set of start scripts which "controls" how the eris/erisdb container is booted and what it does. The following are the environment variables it responds to (along with what they do).

## Variables for **All** ECM Scripts

### $CHAIN_ID

`required`

chain_id is the Identifier of your chain. It can be really anything you want it to be, but it must be set.

### $NODE_HOST

`optional`

If you set the node_host via environment variables, then ecm will make the appropriate addition to the tendermint/eris-db configuration files.

### $NODE_ADDR

`optional`

Same as above. Sets the configuration setting in the config file.

### $KEY

`optional`

If the $KEY is set, it will write whatever is given as the `priv_validator.json` in the appropriate chain directory.

### $GENESIS

`optional`

Same as above, only for the `genesis.json`.

### $GENESIS_CSV

`optional`

Same as above, only for the `genesis.csv`.

### $CHAIN_CONFIG

`optional`

Same as above, only for the (tendermint) `config.toml`.

### $SERVER_CONFIG

`optional`

Same as above, only for the (erisdb) `server_conf.toml`.

## Variables for **chain_new**

Chains New will make a new blockchain for you. This process automates our mint-client tooling to make it fast and easy to hash your own blockchain.

### $CSV

`optional`

TODO: harmonize with $GENESIS_CSV.

### $CONFIG_OPTS

`optional`

These are the config options that will be passed to (mintconfig)[https://github.com/eris-ltd/mint-client] to configure the node appropriately.

## Variables for **chain_install** only

Chains Install will download and setup a friend's permissioned blockchain for you. It also uses our mint-client tooling to make it fast and easy to connect into other's blockchains.

### $REFS_CHAIN_ID

`optional`

The chain_id you are trying to fetch.

### $SEED_NODE

`required`

The IP address of the node you are trying to fetch from.

### $HOST_NAME

`optional`

The host name of the node you are trying to fetch from.

