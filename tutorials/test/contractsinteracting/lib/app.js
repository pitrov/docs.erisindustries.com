// requires
var
  child_process = require('child_process'),
  untildify = require('untildify');

var fs = require ('fs');
var prompt = require('prompt');
var erisC = require('eris-contracts');

// NOTE. On Windows/OSX do not use localhost. find the
// url of your chain with:
// docer-machine ls
// and find the docker machine name you are using (usually default or eris).
var hostname = child_process.execSync('docker-machine ip default',
  {encoding: 'utf8'}).trim();

var erisdbURL = "http://" + hostname + ":1337/rpc";

// get the abi and deployed data squared away
var contractData = require(untildify('~/.eris/apps/idi/epm.json'));
var idisContractAddress = contractData["deployStorageK"];

var idisAbi = JSON.parse(fs.readFileSync(untildify("~/.eris/apps/idi/abi/"
  + idisContractAddress)));

// properly instantiate the contract objects manager using the erisdb URL
// and the account data (which is a temporary hack)
var accountData = require('../account.json');
var contractsManager = erisC.newContractManagerDev(erisdbURL, accountData);

// properly instantiate the contract objects using the abi and address
var idisContract = contractsManager.newContractFactory(idisAbi).at(idisContractAddress);

// display the current value of idi's contract by calling
// the `get` function of idi's contract
function getValue(callback) {
  idisContract.get(function(error, result){
    if (error) { throw error }
    console.log("Idi's number is:\t\t\t" + result['c'][0]);
    callback();
  });
}

// prompt the user to change the value of idi's contract
function changeValue() {
  prompt.message = "What number should Idi make it?";
  prompt.delimiter = "\t";
  prompt.start();
  prompt.get(['value'], function (error, result) {
    if (error) { throw error }
    setValue(result.value)
  });
}

// using eris-contracts call the `set` function of idi's
// contract using the value which was recieved from the
// changeValue prompt
function setValue(value) {
  idisContract.set(value, function(error, result){
    if (error) { throw error }
    getValue(function(){});
  });
}

// Skip the interactive step while testing.
// run
// getValue(changeValue);

module.exports = idisContract;
