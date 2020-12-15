import * as fs from 'fs';
import * as readline from 'readline'

const file = readline.createInterface({
    input: fs.createReadStream('Day3/input.txt'),
})

const count = [0, 0, 0, 0, 0];
var lineNo = 0;
const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

file.on('line', (line: string) => {
    slopes.forEach((slope, index) => {
        if (lineNo % slope[1] === 0 && line.charAt(lineNo / slope[1] * slope[0] % line.length) == '#') {
            ++count[index];
        }
    }
    )
    ++lineNo;
})

file.on('close', () => {
    console.log(count.reduce((p, c) => { return p * c }))
})
