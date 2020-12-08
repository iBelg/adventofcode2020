const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    const rules = data.split('\n').filter(i => i);
    console.log(step1(rules));
    console.log(step2(rules));
});

function step1(rules) {
    const parentRegex = /^(.+) bags contain/;
    const childRegex = /\d+ (.*?) bag[s]?[.,]/g;
    const parsedRules = {};
    rules.forEach((rule) => {
        const parent = parentRegex.exec(rule)[1];
        const children = [];
        let matches;
        while ((matches = childRegex.exec(rule)) !== null) {
            children.push(matches[1]);
        }
        parsedRules[parent] = children;
    });
    return canContain(parsedRules, 'shiny gold').size
}

function canContain(parsedRules, name) {
    const result = new Set();
    for (const [parent, children] of Object.entries(parsedRules)) {
        if (children.some((child) => child === name)) {
            result.add(parent)
            const parentOfParent = canContain(parsedRules, parent);
            if (parentOfParent.size > 0) {
                parentOfParent.forEach((pop) => result.add(pop));
            }
        }
    }
    return result;
}

function step2(rules) {
    const parentRegex = /^(.+) bags contain/;
    const childRegex = /(\d+) (.*?) bag[s]?[.,]/g;
    const parsedRules = {};
    rules.forEach((rule) => {
        const parent = parentRegex.exec(rule)[1];
        const children = [];
        let matches;
        while ((matches = childRegex.exec(rule)) !== null) {
            children.push({
                amount: matches[1],
                name: matches[2],
            });
        }
        parsedRules[parent] = children;
    });
    return countBags(parsedRules, 'shiny gold');
}

function countBags(rules, name) {
    const bags = rules[name];
    let count = 0;
    bags.forEach((bag) => {
        count += (1 + countBags(rules, bag.name)) * bag.amount;     
    });
    return count;
}