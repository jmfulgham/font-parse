const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 3000;
const FontScrapeService = require("./fontScrapeService");
const fontScrapeService = new FontScrapeService();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/parseFonts', (req, res) => {
    const url = req.query.url;
    if (!url) {
        res.status(404).send("Please input a URL to scrape")
    } else {
        axios.get(url).then(resp => {
            const data = resp.data;
            let fontScrapeResponse = fontScrapeService.allLinksParse(data);
            return fontScrapeResponse;
        }).then(resp => {
            let results = {fonts: resp};
            res.send(results);
        }).catch(e => res.status(400).send(`Error: ${e}`));
    }
});

let server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;