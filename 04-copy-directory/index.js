const fs = require ('fs');
const path = require('path');
const pathDest = path.join(__dirname, 'files-copy');
const pathSource = path.join(__dirname, 'files');

const copyFiles = (pathSource, pathDest) => {
    fs.readdir(pathSource, (err, files) => {
        if (err) {
            console.log('Some error in reading derictory');
            return;
        };
        files.forEach(file => {
            const pathFile = path.join(pathSource, file);
            const pathDestFile = path.join(pathDest, file);
            fs.copyFile(pathFile, pathDestFile, (err) => {
                if (err) {
                    console.log('Error while copying file')
                };
            });

        });
    });
};
    
const deleteFiles = (pathSource, pathDest) => {
    fs.readdir(pathDest, (err, destFiles) => {
        if (err) {
            console.log('Mistake while reading files');
            return;
        };
        fs.readdir(pathSource, (err, sourceFiles) => {
            if (err) {
                console.log('Mistake while reading files');
                return;
            };
            const filesToDelete = destFiles.filter(file => !sourceFiles.includes(file));
            filesToDelete.forEach(file => {
                const filePath = path.join(pathDest, file);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log('Error while delete');
                        return;
                    };
                });
            });
        });
    });
};

const copyDir = () => {
    fs.mkdir(pathDest, { recursive: true }, (err) => {
        if (err) {
            console.log('error')}
    });
    copyFiles(pathSource, pathDest);
    deleteFiles(pathSource, pathDest)
};

copyDir();