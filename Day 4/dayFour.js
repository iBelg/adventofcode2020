const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    output: process.stdout,
    console: false
});

async function createPassportArray() {
    return new Promise((resolve, reject) => {
        const passports = [];
        let buffer = '';
        readInterface.on('line', (line) => {
            if (line.trim().length !== 0) {
                buffer += `${line} `
            } else {
                passports.push(buffer.trim());
                buffer = '';
            }
        });

        readInterface.on('close', () => {
            passports.push(buffer.trim());
            resolve(passports);
        });
    });
}

function dayFourStep1(passports) {
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const passportFieldRegex = /(\w{3}):(.*?)(?: |$)/g;
    let validPassportCount = 0;
    passports.forEach((passport) => {
        let [...fields] = passport.matchAll(passportFieldRegex);
        fields = fields.map((field) => field[1]);
        for (let i = 0; i < requiredFields.length; i++) {
            if (!fields.some((field) => field === requiredFields[i])) {
                return;
            }
        }
        validPassportCount++;
    });
    return validPassportCount;
}

function dayFourStep2(passports) {
    const tests = {
        byr: (value) => {
            const regex = /^\d{4}$/;
            if (regex.test(value)) {
                const number = Number(value);
                return number >= 1920 && number <= 2002;
            }
            return false;
        },
        iyr: (value) => {
            const regex = /^\d{4}$/;
            if (regex.test(value)) {
                const number = Number(value);
                return number >= 2010 && number <= 2020;
            }
            return false;
        },
        eyr: (value) => {
            const regex = /^\d{4}$/;
            if (regex.test(value)) {
                const number = Number(value);
                return number >= 2020 && number <= 2030;
            }
            return false;
        },
        hgt: (value) => {
            const regex = /^(\d{1,3})(cm|in)$/
            if (regex.test(value)) {
                const matches = value.match(regex);
                const measurement = matches[1];
                const measuringUnit = matches[2];
                if (measuringUnit === 'cm') {
                    return measurement >= 150 && measurement <= 193;
                } else {
                    return measurement >= 59 && measurement <= 76;
                }
            }
            return false;
        },
        hcl: (value) => {
            const regex = /^#[0-9a-z]{6}$/
            return regex.test(value);
        },
        ecl: (value) => {
            const regex = /^amb|blu|brn|gry|grn|hzl|oth$/;
            return regex.test(value);
        },
        pid: (value) => {
            const regex = /^\d{9}$/;
            return regex.test(value);
        }
    }
    const passportFieldRegex = /(\w{3}):(.*?)(?: |$)/g;
    let validPassportCount = 0;
    passports.forEach((passport) => {
        let [...fields] = passport.matchAll(passportFieldRegex);
        fields = fields.map((field) => ({ key: field[1], value: field[2]}));
        for (const [key, fn] of Object.entries(tests)) {
            const field = fields.find((field) => field.key === key);
            if (field) {
                if (fn(field.value)) {
                    continue;
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        validPassportCount++;
    });
    return validPassportCount;
}

createPassportArray().then((passports) => {
    console.log(dayFourStep1(passports));
    console.log(dayFourStep2(passports));
});



