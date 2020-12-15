import * as fs from 'fs';
import * as readline from 'readline'

const file = readline.createInterface({
    input: fs.createReadStream('Day3/input.txt'),
})

var count = 0;
var lineNo = 0;

file.on('line', (line: string) => {
    if (line.charAt(lineNo * 3 % line.length) == '#') {
        ++count;
    }
    ++lineNo;
})
file.on('close', () =>
    console.log(count));
