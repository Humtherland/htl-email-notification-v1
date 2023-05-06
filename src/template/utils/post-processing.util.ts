const fs = require('fs');
const path = require('path');
const minify = require('html-minifier').minify;

export function postProcessing (filePath: string) {
    fs.writeFileSync(minifiedName(filePath), 
        escapedContent(fs.readFileSync(filePath, 'utf8')), 
        'utf8');
}

function escapedContent(fileContent) {
    return minifiedContent(fileContent).replace(/"/g, '\\"');
}

function minifiedContent(fileContent) {
    return minify(fileContent, { 
        collapseWhitespace: true, 
        removeComments: true 
    });
}

function minifiedName(filePath: string) {
    return path.join(path.dirname(filePath), 
        `${path.basename(filePath, path.extname(filePath))}.min${path.extname(filePath)}`);
}