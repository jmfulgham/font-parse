const nock = require('nock');
const chai = require('chai');
const { expect } = require('chai');

chai.use(chaiNock);


describe('Server Test', ()=>{
  it('Should receive a response from the server when query param is set', (done)=>{
    let url = nock('http://test.com').get('/parseFonts?url=www.test.com').reply(200, {fonts: []});

    expect(url).to.have.been.requestedWith({ url: '' });
    done()
  })
});
