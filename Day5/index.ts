import * as fs from 'fs';
import * as readline from 'readline'

const file = readline.createInterface({
    input: fs.createReadStream('Day5/input.txt'),
})
var maxId = 0;
var minId = 1000;
const seats = new Array<boolean>(1000);
file.on('line', (line: string) => {
    var num = 0;
    line.split('').forEach((c) => {
        num = num * 2 + (c == 'B' || c == 'R' ? 1 : 0);
    })
    if (num > maxId) { maxId = num; }
    if (num < minId) { minId = num; }
    seats[num] = true;

})

file.on('close', () => {
    console.log(maxId);
    for (var i = minId; i < maxId; ++i) {
        if (!seats[i]) {
            console.log(i)
        }
    }
});