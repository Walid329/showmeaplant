import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
app.use(cors());


const token = process.env.TREFLE_TOKEN;
let cachedPlants = [];


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


app.get('/plants', async (req, res) => {
  try {
    if (cachedPlants.length === 0) {
      cachedPlants = await fetchAllPlants();
      setTimeout(() => (cachedPlants = []), 5 * 60 * 1000); // clear cache
    }
    res.json({ data: cachedPlants });
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
