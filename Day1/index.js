const fs = require('fs');
const { exit } = require('process');
const readline = require('readline');

const sum = 2020;
const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),

}

)

const entries = new Set()
file.on('line', (line) => {
    if (entries.has(+line)) {
        console.log(line * (sum - line));
        exit(0);
    }
    entries.add(sum - line);
})