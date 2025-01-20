const fs = require('fs').promises;
const path = require('path');
const resultDir = path.join(__dirname, 'project-dist');
const pathToResult = path.join(resultDir, 'index.html');
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponents = path.join(__dirname, 'components');
const pathToCss = path.join(__dirname, 'styles');
const pathToResultCss = path.join(resultDir, 'style.css');
const pathSource = path.join(__dirname, 'assets');
const pathAssetsResult = path.join(resultDir, 'assets');

const resultCss = [];

async function buildHtml() {
    try {
        await fs.mkdir(resultDir, { recursive: true });
        const components = await fs.readdir(pathToComponents);
        let templateFile = await fs.readFile(pathToTemplate, 'utf-8');

        for (const file of components) {
            const componentName = path.parse(file).name;
            const componentPath = path.join(pathToComponents, file);
            const componentContent = await fs.readFile(componentPath, 'utf-8');
            templateFile = templateFile.replace(`{{${componentName}}}`, componentContent);
            };
        await fs.writeFile(pathToResult, templateFile, 'utf-8');
    }
    catch (err) {
        console.log('Error while reading components', err)
    };
};

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
        await fs.writeFile(pathToResultCss, resultCss.join("\n"));
    } catch (err) {
        console.log('Error while writing file', err);
    }
};

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src);

    for (const entry of entries) {
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);

        const stat = await fs.stat(srcPath);
        if (stat.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
};

async function main() { 
    await buildHtml();
    await createBundle();
    await copyDir(pathSource, pathAssetsResult);
 } 
 main();