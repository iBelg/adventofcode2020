const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    const numbers = data.split('\n').filter(i => i).map(i => Number(i));
    console.log(step1(numbers));
    console.log(step2(numbers));
});

const preambleLength = 25;

function getPreamble(numbers, index) {
    if (numbers.length > index && index - preambleLength >= 0) {
        const preamble = [];
        for (let i = index - preambleLength; i < index; i++) {
            preamble.push(numbers[i]);
        }
        return preamble;
    }
}

function hasSum(numbers, number) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === number) {
                return true;
            }
        }
    }
    return false;
}

function findContiguousSet(numbers, number) {
    const sumReducer = (acc, value) => acc + value;
    let contiguousSet = [];
    for (let i = 0; i < numbers.length; i++) {
        contiguousSet.push(numbers[i]);
        for (let j = i + 1; j < numbers.length; j++) {
            contiguousSet.push(numbers[j]);
            const sum = contiguousSet.reduce(sumReducer);
            if (sum === number) {
                return contiguousSet;
            } else if (sum > number) {
                break;
            }
        }
        contiguousSet = [];
    }
    return false;
}

function step1(numbers) {
    for (let i = preambleLength; i < numbers.length; i++) {
        const preamble = getPreamble(numbers, i);
        const number = numbers[i];
        if (!hasSum(preamble, number)) {
            return number;
        }
    }
}

function step2(numbers) {
    for (let i = preambleLength; i < numbers.length; i++) {
        const preamble = getPreamble(numbers, i);
        const number = numbers[i];
        if (!hasSum(preamble, number)) {
            const contiguousSet = findContiguousSet(numbers, number);
            return Math.min(...contiguousSet) + Math.max(...contiguousSet);
        }
    }
}