const fs = require('fs');
const files = fs.readdirSync('./public/models').filter(f => f.endsWith('.glb'));
fs.writeFileSync('./src/modelsList.json', JSON.stringify(files));
console.log('Done');
