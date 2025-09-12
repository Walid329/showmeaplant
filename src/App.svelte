<script>
  let plant = null;
  let loading = false;
  let error = null;

  const BASE_URL = import.meta.env.VITE_API_URL || 'https://trefle.io/api/v1';

  async function fetchPlant() {
    console.log('BASE_URL:', BASE_URL);
    console.log('Full URL:', `${BASE_URL}/plants`);
    
    loading = true;
    error = null;
    
    try {
      const res = await fetch(`${BASE_URL}/plants`);
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      if (!res.ok) {
        const errorText = await res.text();
        console.log('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${res.status}, body: ${errorText}`);
      }

      const data = await res.json();
      console.log('API Response:', data);
      
      const plantsArray = data.data || [];
      console.log('Plants array length:', plantsArray.length);

      if (!plantsArray.length) {
        error = 'No plants found in response';
        return;
      }

      const randomIndex = Math.floor(Math.random() * plantsArray.length);
      plant = plantsArray[randomIndex];
      console.log('Selected plant:', plant);
    } catch (err) {
      console.error('Failed to fetch plant:', err);
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<main>
  <h1>show me a plant</h1>

  <button on:click={fetchPlant} disabled={loading}>
    {loading ? '🔄' : '🌿'}
  </button>

  {#if error}
    <div style="color: red;">
      <p>Error: {error}</p>
    </div>
  {/if}

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