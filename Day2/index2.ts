import * as fs from 'fs';
import * as readline from 'readline'

const file = readline.createInterface({
    input: fs.createReadStream('input.txt'),
})

var count = 0;
file.on('line', (line: string) => {
    const [range, char, password] = line.split(' ');
    const [from, to] = range.split('-');
    const ch = char[0];
    // console.log(password.charAt(1), password)
    if ((password.charAt(+from - 1) == ch) !== (password.charAt(+to - 1) == ch)) {
        // console.log(password.charAt(+from + 1) == ch, password.charAt(+to + 1) == ch, line, password.charAt(+from + 1), password.charAt(+to + 1), to);
        ++count;
    }
})
file.on('close', () =>
    console.log(count));