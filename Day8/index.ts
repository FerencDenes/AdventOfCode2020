import * as fs from 'fs';
import * as readline from 'readline'

const file = readline.createInterface({
    input: fs.createReadStream('Day8/input.txt'),
})

const code = new Array<[string, number]>();

file.on('line', (line: string) => {
    const [op, num] = line.split(' ');
    code.push([op, +num]);
})

file.on('close', () => {
    var acc = 0;
    var pc = 0;
    const executed = new Set<number>();
    do {
        executed.add(pc);
        if (code[pc][0] == 'acc') {
            acc += code[pc][1];
            ++pc;
        } else {
            if (code[pc][0] == 'jmp') {
                pc += code[pc][1]
            } else {
                ++pc;
            }
        }

    } while (!executed.has(pc));
    console.log(acc);
});