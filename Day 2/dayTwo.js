const fs = require('fs');

function dayTwoStep1(pwdConfigs) {
    const partsRegex = /^(\d+)-(\d+) (\w): (\w+)$/;
    let count = 0;
    pwdConfigs.forEach((pwdConfig) => {
        let matches = pwdConfig.match(partsRegex);
        if (matches) {
            let [full, min, max, letter, password] = matches;
            const testPwd = new RegExp(`^([^${letter}]*?${letter}[^${letter}]*?){${min},${max}}$`);
            if (testPwd.test(password)) {
                count++;
            }
        } 
    });
    return count;
}

function dayTwoStep2(pwdConfigs) {
    const partsRegex = /^(\d+)-(\d+) (\w): (\w+)$/;
    let count = 0;
    pwdConfigs.forEach((pwdConfig) => {
        let matches = pwdConfig.match(partsRegex);
        if (matches) {
            let [full, min, max, letter, password] = matches;
            const firstLetterMatches = password.charAt(min - 1) === letter;
            const secondLetterMatches = password.charAt(max - 1) === letter;
            if (firstLetterMatches != secondLetterMatches) {
                count++;
            }
        } 
    });
    return count;
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    const pwdConfigs = data.split('\n');
    console.log(dayTwoStep1(pwdConfigs));
    console.log(dayTwoStep2(pwdConfigs));
});