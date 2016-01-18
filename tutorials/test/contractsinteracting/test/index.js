'use strict';

var
  assert = require('assert'),
  child_process = require('child_process'),
  fs = require('fs'),
  untildify= require('untildify'),

  validator, converted, account, idisContract;

validator = require(untildify(
  '~/.eris/chains/simplechain/priv_validator.json'));

converted = JSON.parse(child_process.execSync('eris keys convert '
  + validator.address, {encoding: 'utf8'}));

account = {
  address: converted.address,
  pubKey: converted.pub_key[1],
  privKey: converted.priv_key[1]
};

fs.writeFileSync('account.json', JSON.stringify(account, null, 2));
idisContract = require('../lib/app.js');

it("should get and set a value", function (done) {
  idisContract.get(function (error, value) {
    assert.ifError(error);
    assert.equal(value, 5);

    idisContract.set(42, function (error) {
      assert.ifError(error);

      idisContract.get(function (error, value) {
        assert.ifError(error);
        assert.equal(value, 42);
        done();
      });
    });
  });
});
