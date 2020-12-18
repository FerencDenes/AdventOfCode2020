import * as fs from 'fs';
import * as readline from 'readline'

const file = readline.createInterface({
    input: fs.createReadStream('Day7/input.txt'),
})

var count = 0;
const containsGraph = new Map<string, Array<[string, number]>>();

const holdsGraph = new Map<string, Array<[string, number]>>();
const bagWeights = new Map<string, number>();

function getWeight(bag: string): number {
    if (bagWeights.has(bag)) {
        return bagWeights.get(bag);
    }
    var count = 1;
    if (holdsGraph.get(bag)) {
        holdsGraph.get(bag).forEach(([innerBag, weight]) => {
            count += weight * getWeight(innerBag);
        })
    }
    bagWeights.set(bag, count);
    return count;
}

file.on('line', (line: string) => {
    const tokens = line.split(' ');
    const holder = tokens[0] + ' ' + tokens[1];
    holdsGraph.set(holder, []);
    for (var i = 5; i < tokens.length; i += 4) {
        const contained = tokens[i] + ' ' + tokens[i + 1]
        if (!containsGraph.has(contained)) {
            containsGraph.set(contained, new Array());
        }
        containsGraph.get(contained).push([holder, +tokens[i - 1]]);
        if (contained != 'other bags.')
            holdsGraph.get(holder).push([contained, +tokens[i - 1]]);
    }
})

file.on('close', () => {
    {
        const bags = new Set<string>();
        const newColors = new Set<string>(['shiny gold']);
        while (newColors.size) {
            const color = newColors.keys().next().value;
            newColors.delete(color);
            bags.add(color);
            containsGraph.get(color)?.forEach(
                ([c, _]) => {
                    if (!bags.has(c)) {
                        newColors.add(c)
                    }
                })
        }
        console.log(bags.size - 1)
    }
    console.log(getWeight('shiny gold') - 1)
});