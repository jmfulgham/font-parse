const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const fontScrapeService = require('./fontScrapeService');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/parseFont', (req, res) => {
    let url = req.body.url;
    if (!url) {
        res.send("Please input a URL to scrape")
    } else {
        axios.get(url).then(resp => {
            let data = resp.data;
           return fontScrapeService(data);
        }).then(resp => {
            let results = {fonts: resp};

            console.log('resy', results);
            res.send(results);
        })
    .catch(e => `uh oh, ${e}`);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));