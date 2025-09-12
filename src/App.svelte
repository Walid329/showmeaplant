<script>
  let plant = null;

  const BASE_URL = import.meta.env.VITE_API_URL;

  async function fetchPlant() {
    console.log('BASE_URL:', BASE_URL); // Add this
    console.log('Full URL:', `${BASE_URL}/plants`); // Add this
    
    try {
      const res = await fetch(`${BASE_URL}/plants`);

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