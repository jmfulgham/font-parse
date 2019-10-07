const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const axios = require('axios');

function fontScrapeService(htmlRes) {
    const dom = new JSDOM(htmlRes);
    const document = dom.window.document;
    let links = document.getElementsByTagName('link');
    let css = [];
    let results = {fonts: null};
    for (let i = 0; i < links.length; i++) {
        if (links.item(i).type === "text/css") {
            css.push(links.item(i).href)
        }
    }
    css.forEach(url => {
        axios({
            method: 'get',
            url
        }).then(res => {
            results.fonts = regexParse(res.data.trim());
        })
            .catch(e => `Yikes, there's an error: ${e}`);
        console.log(results);
    });
}

function regexParse(data) {
    let fonts =  [];
    let regex = /(font-family:\B([^\;\{\}]*\w*))/;
    fonts.push(data.match(regex)[2]);
    return fonts;
}


module.exports = fontScrapeService;

//todo parse html for fonts
//todo create post endpoint to get fonts
//