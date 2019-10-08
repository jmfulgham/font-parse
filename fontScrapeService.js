const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const axios = require('axios');

async function fontScrapeService(htmlRes) {
    const dom = new JSDOM(htmlRes);
    const document = dom.window.document;
    let links = document.getElementsByTagName('link');
    let css = [];

    for (let i = 0; i < links.length; i++) {
        if (links.item(i).type === "text/css") {
            css.push(axios.get(links.item(i).href).then(res => res.data))
        }
    }

    let res = await Promise.all(css);
    let matches = dataParse(res.toString());
    let noDupes = new Set(matches);
    return Array.from(noDupes);

}

function dataParse(data) {
    let fonts = [];
    let fontFam = data.match(/(font-family\:.*?\;)/gm);
    for (let style in fontFam) {
        if (fontFam[style].includes("font-family")) {
            const fontFamilyValue = fontFam[style].split(':');
            fonts.push(fontFamilyValue[1]);
        }
    }
    return fonts
}

module.exports = fontScrapeService;