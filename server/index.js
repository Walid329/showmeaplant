// server/index.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const token = 'eJKrigW_GXhmXCUIHysFpaE4ed71vQMGnBlD1w3LkHw';
let cachedPlants = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch multiple pages in parallel
async function fetchAllPlants() {
  const pages = [1, 2, 3];
  const allData = await Promise.all(
    pages.map(async (page) => {
      const res = await fetch(
        `https://trefle.io/api/v1/plants?token=${token}&page=${page}&filter_not[common_name]=null`
      );
      const data = await res.json();
      return data.data;
    })
  );
  return allData.flat();
}

app.get('/plants', async (req, res) => {
  try {
    const now = Date.now();
    if (!cachedPlants.length || now - cacheTimestamp > CACHE_DURATION) {
      console.log('Fetching new plants from Trefle API...');
      cachedPlants = await fetchAllPlants();
      cacheTimestamp = now;
    }
    res.json({ data: cachedPlants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
