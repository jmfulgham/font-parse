const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const axios = require('axios');
let allFonts;

class FontScrapeService {

    // find every style css stylesheet link, get its data
    async allLinksParse(htmlRes) {
        const dom = new JSDOM(htmlRes);
        const document = dom.window.document;
        this.styleSheetParse(document);
        let links = document.getElementsByTagName('link');
        let css = [];

        for (let i = 0; i < links.length; i++) {
            if (links.item(i).type === "text/css") {
                css.push(axios.get(links.item(i).href).then(res => res.data))
            }
        }

        let finishedCSS = await Promise.all(css);
        this.dataParse(finishedCSS.toString());
        return allFonts;
    }

    //find any font families from the css stylesheet links and return them
    dataParse(data) {
        let fonts = [];
        let fontFam = data.match(/(font-family\:.*?\;)/gm);
        for (let style in fontFam) {
            if (fontFam[style].includes("font-family")) {
                const fontFamilyValue = fontFam[style].split(':');
                fonts.push(fontFamilyValue[1]);
            }
        }

        let noDupes = new Set(fonts);
        allFonts = Array.from(noDupes);
        return allFonts;
    }

    //find any inline style elements with font families included
    styleSheetParse(document) {
        let style = document.getElementsByTagName('style');
        if (!style) {
            return "No Style Elements Found"
        } else {
            for (let i = 0; i < style.length; i++) {
                let styleString = style.item(i).textContent;
                if (styleString.includes("font-family")) {
                    this.dataParse(styleString);
                }
            }
        }
    }
}


module.exports = FontScrapeService;