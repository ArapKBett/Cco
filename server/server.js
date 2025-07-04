const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '../src')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/cases', express.static(path.join(__dirname, '../cases')));

app.get('/api/cases', async (req, res) => {
  try {
    const files = (await fs.readdir(path.join(__dirname, '../cases')))
      .filter(file => file.endsWith('.json'));
    const cases = await Promise.all(files.map(async file => {
      const data = await fs.readFile(path.join(__dirname, '../cases', file), 'utf8');
      return { file, ...JSON.parse(data) };
    }));
    res.json(cases);
  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).send('Error loading cases');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
