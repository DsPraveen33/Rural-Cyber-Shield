const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');
let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('fetch("/api/')) {
    content = content.replace(/fetch\("\/api\//g, 'fetch(`${import.meta.env.VITE_API_URL || ""}/api/');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
    count++;
  }
}
console.log(`Updated ${count} files.`);
