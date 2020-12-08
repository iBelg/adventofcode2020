const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    const instructions = data.split('\n').filter(i => i);
    console.log(step1(instructions));
    console.log(step2(instructions));
});

function step1(instructions) {
    return run(compile(instructions));
}

function step2(instructions) {
    for (let i = 0; i < instructions.length; i++) {
        const compiledInstructions = compile(instructions);
        const original = compiledInstructions[i];
        if (original.opcode === 'jmp') {
            original.opcode = 'nop';
        } else if (original.opcode === 'nop') {
            original.opcode = 'jmp';
        }
        const memory = run(compiledInstructions);
        if (!memory.infinite) {
            return memory;
        }
    }
}


function compile(instructions) {
    const instructionRegex = /^(\w+) ([+-]?\d+)$/;
    return instructions.map((instruction) => {
        const matches = instruction.match(instructionRegex);
        return {
            opcode: matches[1],
            number: Number(matches[2]),
            executed: 0
        }
    });
}

function run(instructions) {
    const opcodes = {
        nop: ({memory}) => (memory, memory.offset += 1),
        acc: ({memory, number}) => (memory.acc += number, memory.offset += 1),
        jmp: ({memory, number}) => (memory.offset += number),
    }
    const memory = {
        offset: 0,
        acc: 0,
        infinite: false
    }
    while (true) {
        if (memory.offset >= instructions.length) {
            break;
        }
        const instruction = instructions[memory.offset];
        if (instruction.executed) {
            memory.infinite = true;
            break;
        }
        opcodes[instruction.opcode]({memory, number: instruction.number});
        instruction.executed += 1;
    }
    return memory;
}