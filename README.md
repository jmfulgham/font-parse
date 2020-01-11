# Font Family Scraper

This was a code challenge given to me. My instructions were to scrape a webpage and its related CSS files to find all 
fonts being used on the site.

### Technologies I used

- node.js
- express.js
- JSDOM
- axios

### Details

Run `npm i` to download all dependencies. Then, run either `npm start` or `nodemon server.js` to run the app. 


#### GET /parseFonts
  Make your `GET` request to `localhost:3000/parseFonts?url=https://YOUR_URL_HERE`
 
  - Response: `{ fonts: [ ... ] }`

You will receive a JSON response with an array of fonts used on the requested URL.

