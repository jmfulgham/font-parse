const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const FontScrapeService = require("./fontScrapeService");
const fontScrapeService = new FontScrapeService();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/parseFonts', (req, res) => {
    let url = req.query.url;
    console.log(url);
    if (!url) {
        res.status(404).send("Please input a URL to scrape")
    } else {
        axios.get(url).then(resp => {
            let data = resp.data;
            return fontScrapeService.allLinksParse(data);
        }).then(resp => {
            let results = {fonts: resp};
            res.send(results);
        }).catch(e => res.status(400).send(`Unable to parse. Please input another url: ${e}`));
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));