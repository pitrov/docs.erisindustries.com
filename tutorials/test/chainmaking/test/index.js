// Automated test of Tutorials | Making a Permissioned Chain (Simple)
// - Eris v0.11
// https://docs.erisindustries.com/tutorials/chainmaking/

'use strict';

var
  child_process = require('child_process'),
  fs = require('fs'),
  untildify = require('untildify'),

  validator, genesis;

function exec(command) {
  return child_process.execSync(command);
}

function read(name) {
  return fs.readFileSync(untildify('~/.eris/chains/simplechain/') + name,
    'utf8').trim();
}

// Step 1

exec('./step1.sh');

// Step 2

validator = JSON.parse(read('priv_validator.json'));
genesis = JSON.parse(read('genesis.json'));
genesis.chain_id = "simple_chain";

genesis.accounts = [
  {
    address: read('addr1'),
    amount: 690000000000
  },
  {
    address: read('addr2'),
    amount: 565000000000
  },
  {
    address: read('addr3'),
    amount: 525000000000
  }
];

genesis.validators[0].pub_key = validator.pub_key;
genesis.validators[0].unbond_to[0].address = validator.address;

fs.writeFileSync(untildify('~/.eris/chains/simplechain/genesis.json'),
  JSON.stringify(genesis, null, 2));

// Step 3

exec('eris chains new simplechain --dir ~/.eris/chains/simplechain');

it("should be inspectable", function () {
  exec('eris chains inspect simplechain');
});
