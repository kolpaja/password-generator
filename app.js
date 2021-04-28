//@Password Generator script
//@declaration
const result = document.querySelector('.result')
const lengthEl = document.querySelector('#length')
const uppercase = document.querySelector('#uppercase')
const lowercase = document.querySelector('#lowercase')
const number = document.querySelector('#number')
const symbol = document.querySelector('#symbol')
const generate = document.querySelector('#generate')
const copyPassword = document.querySelector('.copy-password')

//@generate random passwords
const randomFnx = {
    lower: getRandomLower,
    upper: getRandomUpper,
    symbol: getRandomSymbol,
    number: getRandomNumber
}
//@generate btn
generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercase.checked;
    const hasLower = lowercase.checked;
    const hasSymbol = symbol.checked;
    const hasNumber = number.checked;

    result.innerText = generatePassword(hasUpper, hasLower, hasSymbol, hasNumber, length);
})

copyPassword.addEventListener('click', () => makeClipboard())
//@generate password fnx
function generatePassword(upper, lower, symbol, number, length) {
    let generatedPassword = '';
    const typesNr = upper + lower + symbol + number;
    const typesArray = [{ upper }, { lower }, { symbol }, { number }].filter(item => Object.values(item)[0])

    //@none selected
    if (typesNr === 0) {
        alert('Please check what to include!')
        generatedPassword = '';
    } else
    //loop for random pass
    {
        for (let i = 0; i < length; i += typesNr) {
            typesArray.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFnx[funcName]();
            })
        }
        generatedPassword = generatedPassword.slice(0, length);
    }
    return generatedPassword;
}
//@function for copy to clipboard
function makeClipboard() {
    console.log('result', result.textContent);
    navigator.clipboard.writeText(result.textContent);
}
//@rnadom fnx
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    //? +97 is where the letter 'a' starts  
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    //? +65 is where the letter 'A' starts  
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    //? +48 the numbers starts form 0 - 9//
}
function getRandomSymbol() {
    const symbol = '!@#$%^&*(){}[]=<>/,.';
    return symbol[Math.floor(Math.random() * symbol.length)];
}

