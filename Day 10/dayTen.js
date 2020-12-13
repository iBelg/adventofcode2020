const fs = require('fs');

function step1(adapters) {
    const sorted = adapters.sort((a, b) => a - b);
    let joltage = 0;
    const diffs = [0, 0, 1];
    for (let i = 0; i < sorted.length; i++) {
        const adapter = sorted[i];
        if (adapter - 3 <= joltage) {
            const diff = adapter - joltage;
            joltage = adapter;
            diffs[diff - 1] += 1;
        }
    }
    return diffs[0] * diffs[2];
}

// NOT MINE! Stupid!

function solution(data) {
    return data.reduce((computed, jolt) => {
      computed[jolt] =
        (computed[jolt - 3] || 0) +
        (computed[jolt - 2] || 0) +
        (computed[jolt - 1] || 0)
      return computed
    }, [1]).pop();
  }
  
  function readInput(filePath) {
    return fs.readFileSync(filePath).toString('utf8').trim().split('\n')
  }
  
  function prepareInput(lines) {
    return lines.map((line) => parseInt(line.trim(), 10)).sort((a, b) => a - b)
  }
  
  console.log('Solution:', solution(prepareInput(readInput('input.txt'))))
