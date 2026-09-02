const fs = require('fs');
const path = require('path');

const cliPath = 'C:/Users/Pranav/AppData/Local/npm-cache/_npx/d7c0f92b98ce1c29/node_modules/@insforge/cli/dist/index.js';
if (fs.existsSync(cliPath)) {
  const code = fs.readFileSync(cliPath, 'utf8');
  let pos = 0;
  while ((pos = code.indexOf('/api/deployments', pos)) !== -1) {
    console.log('Snippet around /api/deployments:', code.substring(Math.max(0, pos - 100), Math.min(code.length, pos + 300)));
    console.log('---');
    pos += 30;
  }
} else {
  console.log('CLI path not found:', cliPath);
}
