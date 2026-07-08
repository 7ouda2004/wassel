async function test() {
  console.log('Testing jsonbin-zeta.vercel.app...');
  const res = await fetch('https://jsonbin-zeta.vercel.app/api/bins', {
    method: 'POST',
    body: JSON.stringify({ message: 'Hello from Wasel!' }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    console.error('Failed:', res.status, await res.text());
    return;
  }

  const data = await res.json();
  console.log('SUCCESS! Created Bin:', data);
  const id = data.id;

  // Read
  const readRes = await fetch(`https://jsonbin-zeta.vercel.app/api/bins/${id}`);
  const readData = await readRes.json();
  console.log('Read success! Content:', readData);

  // Update
  const updateRes = await fetch(`https://jsonbin-zeta.vercel.app/api/bins/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ message: 'Updated Hello!' }),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log('Update status:', updateRes.status, await updateRes.text());
}

test();
