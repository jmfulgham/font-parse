# Webflow Font Family Scraper

Given a URL input, scrape the webpage and its related files to find all fonts being used on the site.

### Technologies to use

- node.js

### Details

Construct a node.js http server (`http`, `express`, `koa`, etc are all good) that will receive a URL as an input. Your service will then parse the URL, and find all fonts that are being used on that page. (no need to crawl the entire domain and traverse all the links).

- Inline style fonts
- CSS stylesheet defined fonts

The API response of your endpoint should include a list of the font families used.

A suggested API structure looks like this:

`POST /parseFonts`
  
  - Request Body: `{ domain: "https://webflow.com" }`

  - Response: `{ fonts: [ ... ] }`

*Stretch goals*:

- Include how many times a character of each font family appears
- Optional parameter to crawl relative links that exist on the page
- Optional parameter to limit the number of pages to crawl
- Optional parameter to perform depth or breadth first crawling
- Tests
- Crawl the 100 most popular sites on [Webflow Discover](webflow.com/discover/popular) section.

### Submission details

- Submit a PR to this repo with your source code with README.md instructions
