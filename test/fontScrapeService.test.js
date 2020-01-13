const fontScrapeService = require('../fontScrapeService');
const fontScraper = new fontScrapeService();
const nock = require('nock');
const dataResponseMock = require('./mocks/dataResponseMock');
const cssResponseMock = require('./mocks/cssResponseMock');
const chai = require('chai');
const expect = require('chai').expect;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

chai.should();

describe('FontScrapeService success', () => {


    it('allLinksParse returns a list of fonts', async () => {

        let allLinksParse = await fontScraper.allLinksParse(dataResponseMock);
        expect(allLinksParse).to.be.an('array');
        expect(allLinksParse).length.to.be.greaterThan(0);
    });

    it('dataParse returns an array of fonts found in stylesheets', () => {
        let dataParse = fontScraper.dataParse(cssResponseMock);
        expect(dataParse).to.be.an('array');
        expect(dataParse).length.to.be.greaterThan(0);
        expect(dataParse.includes('sans-serif')).to.equal(true);
        expect(dataParse).to.not.include("font-family:")
    });

    it('styleSheetParse returns a list of fonts from inline styles', ()=>{
        const {document} = (new JSDOM(`<!DOCTYPE html><style type="text/css">p {font-family: sans-serif;}</style><h1>Testing </h1><p>Hello world</p>`)).window;
        let styleSheetParse = fontScraper.styleSheetParse(document);
        console.log(styleSheetParse)
        expect(styleSheetParse).to.include('sans-serif');
    })

});

