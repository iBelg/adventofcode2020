const fs = require('fs');


function dayThreeStep1(map, rightSteps, downSteps) {
    const threeChar = '#';
    const rows = map.split('\n');
    const rowWidth = rows[0].length;
    let treeCount = 0;
    let x = 0;
    let y = 0;
    do {
        x += rightSteps;
        x = x % rowWidth;
        y += downSteps;
        const currentRow = rows[y];
        if (currentRow) {
            const tile = currentRow.charAt(x);
            if (tile === threeChar) {
                treeCount++;
            }
        }
    } while (y < rows.length);
    return treeCount;
}

function dayThreeStep2(map) {
    const paths = [
        { right: 1, down: 1},
        { right: 3, down: 1},
        { right: 5, down: 1},
        { right: 7, down: 1},
        { right: 1, down: 2},
    ];
    let result = 0;
    paths.forEach((path) => {
        const treeCount = dayThreeStep1(map, path.right, path.down);
        if (result === 0) {
            result = treeCount;
        } else {
            result *= treeCount;
        }
    });
    return result;
}


fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    const map = data;
    console.log(dayThreeStep1(map, 3, 1));
    console.log(dayThreeStep2(map))
});