const baseUrl = 'https://y8337t23.us-east.insforge.app';
const apiKey = 'ik_04514d783f3ee05979eb0ca9ffc487c6';

async function checkAiAndSecrets() {
  console.log('--- Checking /api/ai/openrouter/api-key ---');
  try {
    const res1 = await fetch(`${baseUrl}/api/ai/openrouter/api-key`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    console.log('Status AI key:', res1.status);
    const data1 = await res1.json().catch(() => ({}));
    console.log('Data AI key:', data1);
  } catch (e) {
    console.error('Err 1:', e.message);
  }

  console.log('\n--- Checking /api/secrets ---');
  try {
    const res2 = await fetch(`${baseUrl}/api/secrets`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    console.log('Status Secrets:', res2.status);
    const data2 = await res2.json().catch(() => ({}));
    console.log('Data Secrets:', data2);
  } catch (e) {
    console.error('Err 2:', e.message);
  }
}

checkAiAndSecrets().catch(console.error);
