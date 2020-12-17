import * as fs from 'fs';
import * as readline from 'readline'

const file = readline.createInterface({
    input: fs.createReadStream('Day6/input.txt'),
})

var count = 0;
var allCount = 0;
const answers = new Set<string>();
const allAnswers = new Set<string>();
console.log()
file.on('line', (line: string) => {
    if (!line) {
        count += answers.size
        allCount += allAnswers.size;
        // console.log(count)
        // console.log(allCount, allAnswers.entries())
        answers.clear();
        allAnswers.clear();

    } else {

        if (answers.size == 0) {
            line.split('').forEach((c) => { allAnswers.add(c) });
        } else {
            allAnswers.forEach(c => { if (line.indexOf(c) < 0) allAnswers.delete(c) })
            // console.log(allAnswers.entries())
        }
        line.split('').forEach((c) => { answers.add(c) });
    }
})

file.on('close', () => {
    count += answers.size
    if (allAnswers.size == 0) {
        answers.forEach(c => allAnswers.add(c));
    } else {
        allAnswers.forEach(c => { if (!answers.has(c)) allAnswers.delete(c) })
    }
    allCount += allAnswers.size;
    console.log(count)
    console.log(allCount)
});