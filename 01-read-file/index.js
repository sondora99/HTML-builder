const fs = require('fs');
const path = require('node:path');
const { stdin, stdout } = require('node:process');
const pathToFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToFile);
stream.on('data', data => {
    process.stdout.write(data); 
})