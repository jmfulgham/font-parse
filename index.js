const express = require('express');
const app = express();
const axios = require('axios');
const fontScrapeService = require('./fontScrapeService');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    let url = req.query.url;

    if (url) {
        axios({
            method: 'get',
            url
        }).then(resp => {
            let data = resp.data;
            fontScrapeService(data);
        }).catch(e => `uh oh, ${e}`);
    } else {
        res.send("Please input a URL to scrape")
    }
});
