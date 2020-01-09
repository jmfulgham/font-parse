const chai = require('chai');
const chaiNock = require('chai-nock');
const { expect } = require('chai');
chai.use(chaiNock);

const nock = require('nock');

describe('Server Test', ()=>{
  let url = 'http://test.com';
  it('Should receive a response from the server when query param is set', ()=>{
    expect(nock(url).get('/parseFonts?url=www.test.com'));
  })
});
