const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(require('cors')({ origin: true }))

app.get('/search', async (req, res) => {
  try {
    const { query } = req;
    const response = await axios.get(`https://www.google.com/search?q=${query.query}`);
    const $ = cheerio.load(response.data);

    const links = [];
    $('a').each((index, element) => {
      const link = $(element).attr('href');
      if (link && link.startsWith('/url?q=')) {
        const cleanLink = link.replace('/url?q=', '').split('&')[0];
        if (!cleanLink.includes('google.com')) {
          links.push(cleanLink);
        }
      }
    });

    res.send(links);
  } catch (error) {
    console.error('Error searching articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
