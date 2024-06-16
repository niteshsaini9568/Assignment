// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();

// Define a URL to fetch
const url = 'https://www.eventbrite.com/d/india/b2b-marketing/';
const port = process.env.PORT || 3000;


// Fetch data from the URL using axios
axios.get(url)
    .then(async response => {
        const $ = cheerio.load(response.data);

        // Adjusted selector to target event titles
        const eventTitles = [];
        $('.Stack_root__1ksk7').each((index, element) => {
            const title = $(element).text().trim();
            eventTitles.push(title);
        });

        // Log the extracted event titles
        const eventTitlesJSON = eventTitles.map((title, index) => ({
            id: index + 1,
            title: title
        }));

        console.log('Scraped Event Titles:', JSON.stringify(eventTitlesJSON, null, 2));
    })
    .catch(error => {
        console.log('Error fetching the URL:', error);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
