const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    const passes = data.split('\n').filter(i => i);
    console.log(step1(passes));
    console.log(step2(passes));
});

function step1(passes) {
    const seatIds = [];
    passes.forEach((pass) => {
        seatIds.push(getSeatId(pass));
    });
    return Math.max(...seatIds);
}

function step2(passes) {
    const seatIds = [];
    passes.forEach((pass) => {
        seatIds.push(getSeatId(pass));
    });
    const sortedSeatIds = seatIds.sort();
    const firstSeatId = sortedSeatIds[0];
    for (let i = 0, nextSeatId = firstSeatId; i <= sortedSeatIds.length; i++, nextSeatId++) {
        if (sortedSeatIds[i] !== nextSeatId) {
            return nextSeatId;
        }
    }
}

function getSeatId(pass) {
    const bits = pass.replace(/F/g, 0).replace(/B/g, 1).replace(/L/g, 0).replace(/R/g, 1);
    return parseInt(bits, 2);
}