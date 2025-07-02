const resultEl = document.getElementById('passwordResult');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('includeUppercase');
const lowercaseEl = document.getElementById('includeLowercase');
const numberEl = document.getElementById('includeNumbers');
const symbolsEl = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%&*()_=+-{}[],.<>?/';

generateBtn.addEventListener("click", generatePasword);
copyBtn.addEventListener('click', copyToClipboard);

function generatePasword() {
    let length = parseInt(lengthEl.value);
    let chars = "";
    if (uppercaseEl.checked) chars += lettersUpper;
    if (lowercaseEl.checked) chars += lettersLower;
    if (numberEl.checked) chars += numbers;
    if (symbolsEl.checked) chars += symbols;

    if (chars === "") {
        resultEl.value = "Selecione ao menos 1 opção";
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    resultEl.value = password;
}

function copyToClipboard() {
    if(resultEl.value === "" || resultEl.value.startsWith('Selecione')) return;
    
    navigator.clipboard.writeText(resultEl.value).then(() => {
        copyBtn.textContent = '✅';
        setTimeout(() => copyBtn.textContent = '📋', 1500); 
    });
}