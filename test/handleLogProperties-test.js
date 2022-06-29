const expect = require('chai').expect;
const mocha = require("mocha");
const handleLogProperties = require("../common/handleLogProperties");

mocha.describe('handleLogProperties tests', () => {
  mocha.it('should return cpf,cnpj,cpf_cnpj encrypted when has cpf,cnpj,cpf_cnpj property', () => {
    const obj = {
      body: {
        cpf: '12345678912',
        cnpj: '12345678912',
        cpf_cnpj: '12345678912',
      }
    }
    const objExpected = {
      body: {
        cpf: '0c7b64553c5013c309b2a7a58cb5bb9e',
        cnpj: '0c7b64553c5013c309b2a7a58cb5bb9e',
        cpf_cnpj: '0c7b64553c5013c309b2a7a58cb5bb9e'
      }
    }
    handleLogProperties(obj);
    expect(obj).to.be.eql(objExpected);
  });

  mocha.it('should return cpf encrypted when has cpf and empty property', () => {
    const obj = {
      body: {
        cpf: '12345678912',
      },
      'null': null
    }
    const objExpected = {
      body: {
        cpf: '0c7b64553c5013c309b2a7a58cb5bb9e',
      }
    }
    handleLogProperties(obj);
    expect(obj).to.be.eql(objExpected);
  });

  mocha.it('should return log object when valid properties', () => {
    const obj = {
      foo: 'bar',
      body: {
        bar: 'foo'
      }
    }
    const objExpected = {
      foo: 'bar',
      body: {
        bar: 'foo'
      }
    }
    handleLogProperties(obj);
    expect(obj).to.be.eql(objExpected);
  });

  mocha.it('should return empty object when has empty properties', () => {
    const obj = {
      'undefined': undefined,
      'null': null,
      'null2': 'null',
    }
    const objExpected = {}
    handleLogProperties(obj);
    expect(obj).to.be.eql(objExpected);
  });
})
