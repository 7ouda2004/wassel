import fetch from 'node-fetch';

const STORAGE_URL = 'https://jsonbin-zeta.vercel.app/api/bins/WEnPaFzwcT';

async function run() {
  try {
    console.log('Fetching database...');
    const res = await fetch(STORAGE_URL);
    if (!res.ok) {
      console.error('Failed to fetch:', res.statusText);
      return;
    }
    const db = await res.json();
    console.log('Current Specialists in Cloud:');
    console.log(db.specialists.map(s => ({ id: s.id, name: s.name, username: s.username })));

    // Clean up specialists (filter out Abdollah and Sanossy if present)
    const originalCount = db.specialists.length;
    db.specialists = db.specialists.filter(s => {
      const lowerUsername = (s.username || '').toLowerCase();
      const lowerName = (s.name || '').toLowerCase();
      return !lowerUsername.includes('abdollah') && 
             !lowerUsername.includes('sanossy') &&
             !lowerName.includes('abdollah') &&
             !lowerName.includes('sanossy');
    });

    console.log(`Filtered specialists. Count: ${originalCount} -> ${db.specialists.length}`);

    console.log('Saving database back...');
    const saveRes = await fetch(STORAGE_URL, {
      method: 'PUT',
      body: JSON.stringify(db),
      headers: { 'Content-Type': 'application/json' }
    });

    if (saveRes.ok) {
      console.log('Cloud DB cleaned successfully!');
    } else {
      console.error('Failed to save cloud DB:', saveRes.statusText);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
