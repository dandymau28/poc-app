// 📁 File: scripts/build-feature.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node build-feature.js <feature-name>');
  process.exit(1);
}

const feature = args[0];
const entry = path.resolve(__dirname, `../../../features/${feature}/index.js`);
const outDir = path.resolve(__dirname, `../../../dist/${feature}/1.0.0`);

if (!fs.existsSync(entry)) {
  console.error(`❌ Entry file not found: ${entry}`);
  process.exit(1);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

try {
  execSync(`npx react-native bundle \
    --entry-file ${entry} \
    --platform android \
    --bundle-output ${outDir}/main.bundle \
    --assets-dest ${outDir} \
    --dev false`, { stdio: 'inherit' });

  console.log(`✅ Feature '${feature}' bundled successfully to ${outDir}`);
} catch (err) {
  console.error('❌ Failed to bundle feature:', err);
  process.exit(1);
}