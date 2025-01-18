const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = require('process');
const pathToFile = path.join(__dirname, 'message.txt');
const addToFile = fs.createWriteStream(pathToFile);

stdout.write('Hello, my friend!\nWhat is your name? \n');
stdin.on('data', data => {
    const input = data.toString().trim();
    if (input.toLowerCase() === "exit") {
        stdout.write('Thank you and good bye!');
        stdout.write('\n');
        exit();
    } else {
       addToFile.write(data);
    };
});

process.on('SIGINT', () => {
    stdout.write('Thank you and good bye!');
    stdout.write('\n');
    exit();
})



