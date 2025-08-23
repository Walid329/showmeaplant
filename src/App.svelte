<script>
  let plant = null;

  // Set your backend URL
  const BASE_URL = import.meta.env.VITE_API_URL || 'https://showmeaplant-production.up.railway.app';

  async function fetchPlant() {
    try {
      const url = `${BASE_URL}/plants`;
      console.log('Fetching from:', url);

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Received from backend:', data);

      const plantsArray = data.data || []; // backend returns object with data array

      if (!plantsArray.length) {
        console.warn('No plants found!');
        return;
      }

      // Pick a random plant
      const randomIndex = Math.floor(Math.random() * plantsArray.length);
      plant = plantsArray[randomIndex];
    } catch (err) {
      console.error('Failed to fetch plant:', err);
      alert('Failed to fetch plant. Check console for details.');
    }
  }
</script>

<main style="padding: 2rem;">
  <div style="margin-top: 1rem;">
    <h1>show me a plant</h1>
  </div>

  <button on:click={fetchPlant} style="padding: 0.5rem 1rem; margin-top: 1rem;">
    🌿
  </button>

  {#if plant}
    <div style="margin-top: 1rem;">
      <h2>{plant.common_name || 'Unknown Common Name'}</h2>
      <p><em>{plant.scientific_name}</em></p>

      {#if plant.image_url}
        <img src={plant.image_url} alt={plant.common_name} width="200" />
      {:else}
        <p>No image available</p>
      {/if}
    </div>
  {/if}
</main>
