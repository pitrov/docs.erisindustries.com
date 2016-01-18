#!/bin/sh

set -o errexit
set -o xtrace

eris services start keys

chain_dir=~/.eris/chains/simplechain
rm -rf $chain_dir
mkdir $chain_dir
eris keys gen > $chain_dir/addr1
eris keys gen > $chain_dir/addr2
eris keys gen > $chain_dir/addr3

eris keys pub $(cat $chain_dir/addr1) > $chain_dir/pub_key

eris keys convert $(cat $chain_dir/addr1) > $chain_dir/priv_validator.json

cp ~/.eris/chains/default/config.toml $chain_dir/config.toml
cp ~/.eris/chains/default/server_conf.toml $chain_dir/server_conf.toml
cp ~/.eris/chains/default/genesis.json $chain_dir/genesis.json
