const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const fontScrapeService = require('./fontScrapeService');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    let url = req.query.url;

    if (url) {
        axios({
            method: 'get',
            url
        }).then(resp => {
            let htmlRes = resp.data;
            fontScrapeService(htmlRes);
        }).catch(e => `uh oh, ${e}`);
    }
    else {
        res.send("Please input a URL to scrape")
    }

});
