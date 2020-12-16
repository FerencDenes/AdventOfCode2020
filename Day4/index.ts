import * as fs from 'fs';
import * as readline from 'readline'

const file = readline.createInterface({
    input: fs.createReadStream('Day4/input.txt'),
})

var count = 0;
var deepCount = 0;
var matched = true;
const fields = new Map([
    ['byr', (s: string) => { return +s >= 1920 && +s <= 2002 }],
    ['iyr', (s: string) => { return +s >= 2010 && +s <= 2020 }],
    ['eyr', (s: string) => { return +s >= 2020 && +s <= 2030 }],
    ['hgt', (s: string) => {
        return s.match(/^\d\d\dcm$/) ?
            (+s.substr(0, 3) >= 150 && +s.substr(0, 3) <= 193) :
            s.match(/^\d\din$/) ? (+s.substr(0, 2) >= 59 && +s.substr(0, 2) <= 76) : false
    }],
    ['hcl', (s: string) => { return !!s.match(/^\#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/); }],
    ['ecl', (s: string) => { return !!s.match(/^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/) }],
    ['pid', (s: string) => { return !!s.match(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/); }]]);
var existingields = new Set<string>();
file.on('line', (line: string) => {
    if (!line) {
        if (existingields.size === fields.size) {
            ++count;
            if (matched) {
                deepCount++;
            }
        }
        matched = true;
        existingields.clear();
    } else {
        line.split(' ').forEach(token => {
            const [key, value] = token.split(':');
            if (fields.has(key)) {
                existingields.add(key);
                matched &&= fields.get(key)(value);
                // console.log(`${key} ${value} ${matched}`)
            }
        });
    }
})

file.on('close', () => {
    if (existingields.size === fields.size) {
        ++count;
    }
    console.log(count)
    console.log(deepCount);
});