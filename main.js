import PasswordGenerator from "./script.js";

document.addEventListener("DOMContentLoaded", () => {

    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    const uppercaseCheckbox = document.getElementById('upperCaseCheckbox');
    const lowercaseCheckbox = document.getElementById('lowerCaseCheckbox');
    const numbersCheckbox = document.getElementById('numbersCheckbox');
    const symbolsCheckbox = document.getElementById('symbolsCheckbox');
    const passwordOutput = document.getElementById('passwordOutput');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const strengthBars = document.querySelectorAll('.strength-bars .bar');
    const strengthLabel= document.getElementById('strengthLabel');

    const passwordGenerator = new PasswordGenerator();

    lengthSlider.addEventListener('input', (e) => {
        lengthValue.textContent = e.target.value;
    });

    const updateStrengthIndicator = () => {
        const criteriaCount = [
            uppercaseCheckbox.checked,
            lowercaseCheckbox.checked,
            numbersCheckbox.checked,
            symbolsCheckbox.checked,
        ].filter(Boolean).length;

    };

    const generatePassword = () => {
        const options = {
            uppercase: uppercaseCheckbox.checked,
            lowercase: lowercaseCheckbox.checked,
            numbers: numbersCheckbox.checked,
            symbols: symbolsCheckbox.checked,
        };

        try {
            const password = passwordGenerator.generate(lengthSlider.value, options);
            passwordOutput.textContent = password;
        } catch (error) {
            passwordOutput.textContent = error.message;
        }

        const criteriaCount = [
            uppercaseCheckbox.checked,
            lowercaseCheckbox.checked,
            numbersCheckbox.checked,
            symbolsCheckbox.checked,
        ].filter(Boolean).length;

        let strengthMessage;
       let  strength

        // console.log("lengthSlider",lengthSlider.value)

        if (lengthSlider.value < 8) {
            strengthMessage = 'TOO WEAK!'
            strength = 1
        } else if(lengthSlider.value >= 8 && criteriaCount ===1) {
            strengthMessage = 'WEAK'
            strength = 2
        } else if(lengthSlider.value >= 8 && criteriaCount >= 2 && lengthSlider.value < 12) {
            strengthMessage = 'MEDIUM'
            strength = 3
        } else if(lengthSlider.value >= 12  && criteriaCount >= 3){
            strengthMessage = 'STRONG'
            strength = 4
        } else{
            strengthMessage = 'TOO WEAK!'
        }

        strengthBars.forEach(bar=> bar.style.backgroundColor = "transparent")


        const colorIndicator = {
           "TOO WEAK!": '#F64A4A',
            WEAK: '#FB7C58',
            MEDIUM: '#F8CD65',
            STRONG: '#A4FFAF',
        }

        // console.log(strengthMessage);
        strengthLabel.textContent = strengthMessage;


        console.log("strength",strength)
        for (let i=0; i<strength; i++) {
            strengthBars[i].style.backgroundColor = colorIndicator[strengthMessage]
            console.log(strengthBars[i].style.backgroundColor);
        }
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(passwordOutput.textContent);
        alert('Invalid!');
    };

    uppercaseCheckbox.addEventListener('change', updateStrengthIndicator);
    lowercaseCheckbox.addEventListener('change', updateStrengthIndicator);
    numbersCheckbox.addEventListener('change', updateStrengthIndicator);
    symbolsCheckbox.addEventListener('change', updateStrengthIndicator);
    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyPassword);

});