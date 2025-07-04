const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '../src')));
app.use('/images', express.static(path.join(__dirname, '../src/images'))); // Updated to src/images
app.use('/cases', express.static(path.join(__dirname, '../src/cases')));  // Updated to src/cases

app.get('/api/cases', async (req, res) => {
  try {
    const files = (await fs.readdir(path.join(__dirname, '../src/cases'))) // Updated path
      .filter(file => file.endsWith('.json'));
    const cases = await Promise.all(files.map(async file => {
      const data = await fs.readFile(path.join(__dirname, '../src/cases', file), 'utf8'); // Updated path
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
