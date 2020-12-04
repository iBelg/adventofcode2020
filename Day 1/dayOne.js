const fs = require('fs');

function dayOne(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = ++i; j < numbers.length; j++) {
            for (let l = ++j; l < numbers.length; l++) {
                const numberOne = numbers[i];
                const numberTwo = numbers[j];
                const numberThree = numbers[l];
                if (numberOne + numberTwo + numberThree === 2020) {
                    return numberOne * numberTwo * numberThree;
                }
            }            
        }
    }
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    console.log(dayOne(data.split('\n').map(i => Number(i))));
});