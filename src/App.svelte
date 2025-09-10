<script>
  let plant = null;

  const BASE_URL = import.meta.env.VITE_API_URL 
  async function fetchPlant() {
    try {
      const url = `${BASE_URL}/plants`;
      const res = await fetch(url);

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const plantsArray = data.data || [];

      if (!plantsArray.length) return;

      const randomIndex = Math.floor(Math.random() * plantsArray.length);
      plant = plantsArray[randomIndex];
    } catch (err) {
      console.error('Failed to fetch plant:', err);
      alert('Failed to fetch plant. Check console for details.');
    }
  }
</script>

<main>
  <h1>show me a plant</h1>

  <button on:click={fetchPlant}>🌿</button>

  {#if plant}
    <div>
      <h2>{plant.common_name || 'Unknown Common Name'}</h2>
      <p><em>{plant.scientific_name}</em></p>
      {#if plant.image_url}
        <img src={plant.image_url} alt={plant.common_name} />
      {:else}
        <p>No image available</p>
      {/if}
    </div>
  {/if}
</main>

<footer>
  <span class="leaf-icon">🌿</span>
  <span class="line">
    built using 
    <a href="https://trefle.io" target="_blank" rel="noopener noreferrer">Trefle.io</a> 
    & written in 
    <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a> 
    by Walid Esse
  </span>
  <span class="line">
    check out my other 
    <a href="https://walidesse.info" target="_blank" rel="noopener noreferrer">projects</a>
  </span>
</footer>
