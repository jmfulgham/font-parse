const nock = require('nock');
const chai = require('chai');
const expect = require('chai').expect;
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

    it("should return 404 with no specified query param", () => {
        return chai.request(server)
            .get('/parseFonts')
            .then(function (res) {
                res.should.have.status(404);
            });
    });

    it("should return an array with a query param set", () => {
        return chai.request(server)
            .get('/parseFonts?url=https://www.twitter.com')
            .then(function (res) {
                res.should.have.status(200);
                expect(res.body).to.have.property('fonts').with.lengthOf(0)
            });
    });

});
