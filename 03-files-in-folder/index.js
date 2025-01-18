const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

const files = fs.readdir(pathToFolder, (err, files) => {
    if (err) {
        console.log('mistake')
    } else {
        files.forEach(file => {
            const pathToFile = path.join(pathToFolder, file);

            fs.stat(pathToFile, (err, stats) => {
                if (err) {
                    console.log('mistake');
                    return;
                } 
                if (stats.isFile()) {
                    console.log(`${path.basename(file).replace(path.extname(file), '')} - ${path.extname(file).toString().replace('.', '')} - ${stats.size * 0.001}kb`);
                }
            });
        });
    };
});
