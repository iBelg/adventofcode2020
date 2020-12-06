const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    output: process.stdout,
    console: false
});

async function parseInput() {
    return new Promise((resolve, reject) => {
        const groups = [];
        let persons = [];
        readInterface.on('line', (line) => {
            if (line.trim().length !== 0) {
                persons.push(line.trim().split(''))
            } else {
                groups.push(persons);
                persons = [];
            }
        });

        readInterface.on('close', () => {
            groups.push(persons);
            resolve(groups);
        });
    });
}

function unique(arr) {
    return [...new Set(arr)]
}

function intersection(arr1, arr2) {
    return arr1.filter(value => arr2.includes(value));
}

function count(arr) {
    return arr.reduce((result, answers) => result + answers.length, 0)
}

function step1(groups) {
    const flatten = (result, person) => result.concat(person);
    const processedGroups = groups.map(i => unique(i.reduce(flatten, [])));
    return count(processedGroups); 
}

function step2(groups) {
    const intersecter = (result, person) => intersection(result, person);
    const processedGroups = groups.map(i => i.reduce(intersecter));
    return count(processedGroups);
}

parseInput().then((groups) => {
    console.log(step1(groups));
    console.log(step2(groups));
})