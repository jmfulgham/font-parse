# Font Family Scraper

This was a code challenge given to me to scrape a webpage and its related files to find all fonts being used on the site.

### Technologies I used

- node.js
- express.js
- JSDOM
- axios

### Details

Run `npm i` to download all dependencies. Then, run either `npm start` or `nodemon index.js` to run the app. 


#### POST /parseFonts
  Make your request to `localhost:3000/parseFonts`
  
  - Request Body: `{ url: "https://webflow.com" }`

  - Response: `{ fonts: [ ... ] }`

You will receive a JSON response with an array of fonts used on the requested URL.

