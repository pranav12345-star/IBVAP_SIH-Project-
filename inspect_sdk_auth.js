const fs = require('fs');
const path = require('path');

const sdkDir = path.join(__dirname, 'node_modules', '@insforge', 'sdk');
console.log('SDK Dir exists:', fs.existsSync(sdkDir));

if (fs.existsSync(sdkDir)) {
  const pkgJson = JSON.parse(fs.readFileSync(path.join(sdkDir, 'package.json'), 'utf8'));
  console.log('SDK Main/Module/Types:', pkgJson.main, pkgJson.module, pkgJson.types);

  // Search d.ts files in dist for Auth methods
  function findDts(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        findDts(full);
      } else if (f.endsWith('.d.ts')) {
        const content = fs.readFileSync(full, 'utf8');
        if (content.includes('auth') || content.includes('signUp') || content.includes('signIn')) {
          console.log('Found in', f, ':');
          const lines = content.split('\n');
          lines.forEach((l, i) => {
            if (l.includes('signUp') || l.includes('signIn') || l.includes('auth') || l.includes('Auth')) {
              console.log(`  L${i+1}:`, l.trim());
            }
          });
        }
      }
    }
  }

  findDts(path.join(sdkDir, 'dist'));
}
