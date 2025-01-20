const fs = require('fs').promises;
const path = require('path');
const pathToCss = path.join(__dirname, 'styles');
const pathToProject = path.join(__dirname, 'project-dist');
const pathToResult = path.join(pathToProject, 'bundle.css');
const resultCss = [];

async function makeArrayCss(pathToCss) {
    try {
        const files = await fs.readdir(pathToCss);
        for (const elem of files) {
            const pathToFile = path.join(pathToCss, elem);
            if (path.extname(elem) === '.css') {
                const data = await fs.readFile(pathToFile);
                resultCss.push(data);
                }
        };
    } catch (err) {
        console.log('Error')
    }
};

async function createBundle() {
    try {
        await makeArrayCss(pathToCss);
        await fs.writeFile(pathToResult, resultCss.join("\n"));
    } catch (err) {
        console.log('Error while writing file');
    }
};

createBundle()
