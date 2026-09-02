import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://y8337t23.us-east.insforge.app',
  anonKey: 'ik_04514d783f3ee05979eb0ca9ffc487c6'
});

async function verifyAuthFlow() {
  const timestamp = Date.now();
  const testEmail = `officer_${timestamp}@ibvap.gov.in`;
  const testPassword = 'SecurePassword2026';
  const testName = 'Commander Valerie Vance';

  console.log('--- STEP 1: TESTING SIGN UP ---');
  const signUpRes = await insforge.auth.signUp({
    email: testEmail,
    password: testPassword,
    name: testName
  });

  if (signUpRes.error) {
    console.error('Sign Up Error:', signUpRes.error);
    process.exit(1);
  }

  console.log('✅ Sign Up Successful! User ID:', signUpRes.data.user.id);
  console.log('User Email:', signUpRes.data.user.email);
  console.log('Access Token Received:', !!signUpRes.data.accessToken);

  console.log('\n--- STEP 2: TESTING SIGN IN ---');
  const signInRes = await insforge.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });

  if (signInRes.error) {
    console.error('Sign In Error:', signInRes.error);
    process.exit(1);
  }

  console.log('✅ Sign In Successful! User ID:', signInRes.data.user.id);
  console.log('User Profile:', signInRes.data.user.profile);
  console.log('Access Token Received:', !!signInRes.data.accessToken);

  console.log('\n--- STEP 3: TESTING SIGN OUT ---');
  const signOutRes = await insforge.auth.signOut();
  console.log('✅ Sign Out Status:', signOutRes);
}

verifyAuthFlow().catch(console.error);
