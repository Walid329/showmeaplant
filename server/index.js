import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const token = 'eJKrigW_GXhmXCUIHysFpaE4ed71vQMGnBlD1w3LkHw';
let cachedPlants = [];

// Fetch plants from Trefle API
async function fetchAllPlants() {
  const allPlants = [];
  for (let page = 1; page <= 3; page++) {
    const res = await fetch(
      `https://trefle.io/api/v1/plants?token=${token}&page=${page}&filter_not[common_name]=null`
    );
    const data = await res.json();
    allPlants.push(...data.data);
  }
  return allPlants;
}

// Route to return plants
app.get('/plants', async (req, res) => {
  try {
    if (cachedPlants.length === 0) {
      cachedPlants = await fetchAllPlants();
      // Clear cache in 5 minutes
      setTimeout(() => (cachedPlants = []), 5 * 60 * 1000);
    }
    res.json({ data: cachedPlants });
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Use Railway-provided PORT or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
