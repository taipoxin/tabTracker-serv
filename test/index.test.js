const mocha = require('mocha');
const chai = require('chai');

const testF = require('../lib/index');

describe('testF', () => {
  it('should return 6', () => {
    chai.expect(testF(3, 2)).to.equal(6);
  });
});
