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

    it("should return a 400 when url is incomplete", ()=>{
        return chai.request(server)
            .get('/parseFonts?url=www.test.com')
            .then(function (res) {
                res.should.have.status(400);
                expect(res.text).to.equal("Error: Error: connect ECONNREFUSED 127.0.0.1:80. Please make sure your url includes https://...")

            });

    });

});
