<script>
let plant = null;

async function fetchPlant()
 {
  try {
    const res = await fetch('http://localhost:3000/plants');
    const data = await res.json();

    // pick a random plant
    const randomIndex = Math.floor(Math.random() * data.length);
    plant = data[randomIndex];
  } catch (err) {
    console.error('Failed to fetch plant:', err);
  }
}

</script>

<main style="padding: 2rem;">
  <div style="margin-top: 1rem;">
    <h1>show me a plant</h1>
  </div>

  <button on:click={fetchPlant} style="padding: 0.5rem 1rem;">
    🌿
  </button>

  {#if plant}
    <div style="margin-top: 1rem;">
      <h2>{plant.common_name || 'Unknown Common Name'}</h2>
      <p><em>{plant.scientific_name}</em></p>
      {#if plant.image_url}
        <img src={plant.image_url} alt={plant.common_name} width="200" />
      {/if}
    </div>
  {/if}
</main>
