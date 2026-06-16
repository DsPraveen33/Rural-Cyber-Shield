const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/scanner.tsx',
  'src/components/learning/ai-video-studio.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/fetch\(`\$\{import\.meta\.env\.VITE_API_URL \|\| ""\}\/api\/(.*?)",/g, 'fetch(`${import.meta.env.VITE_API_URL || ""}/api/$1`,');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
