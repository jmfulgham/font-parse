const nock = require('nock');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);


describe('Server Test', ()=>{
  it('Should receive a 404 response from the server when no query param is set', (done) => {
    chai.request(server)
        .get('/parseFonts?url=')
        .end((err, res) => {
          console.log(res);
          expect(res.status.equal(404));
          res.body.should.be.a('string');
          done();
        });
  })
});
