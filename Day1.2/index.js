const fs = require('fs');
const { exit } = require('process');
const readline = require('readline');

const sum = 2020;
const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),
})

const entries = new Set()
const doubleentries = new Map()
file.on('line', (line) => {
    const numLine = +line
    if (doubleentries.has(numLine)) {
        console.log(numLine * doubleentries.get(numLine)[0] * doubleentries.get(numLine)[1]);
        exit(0);
    }
    entries.forEach((value) =>
        doubleentries.set(sum - value - numLine, [value, numLine])
    );
    entries.add(numLine);
})