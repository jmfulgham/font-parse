const nock = require('nock');
const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);
chai.should();


describe('Server Test', () => {
    it(" should 404 at '/' since this path isn't specified", () => {
        return chai.request(server)
            .get('/')
            .then(function (res) {
                res.should.have.status(404);
            });
    });

});
