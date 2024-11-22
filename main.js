class PasswordGenerator {
  constructor() {
      this.length = 10;
      this.uppercase = false;
      this.lowercase = false;
      this.numbers = false;
      this.symbols = false;

      this.init();
  }

  init() {
      // Elements
      this.lengthSlider = document.getElementById('lengthSlider');
      this.lengthValue = document.getElementById('lengthValue');
      this.uppercaseCheckbox = document.getElementById('upperCaseCheckbox');
      this.lowercaseCheckbox = document.getElementById('lowerCaseCheckbox');
      this.numbersCheckbox = document.getElementById('numbersCheckbox');
      this.symbolsCheckbox = document.getElementById('symbolsCheckbox');
      this.passwordOutput = document.getElementById('passwordOutput');
      this.generateButton = document.getElementById('generateButton');
      this.copyButton = document.getElementById('copyButton');
      this.strengthBars = document.querySelectorAll('.strength-bars .bar');
      this.strengthLabel = document.getElementById('strengthLabel');

      // Event Listeners
      this.addEventListeners();
  }

  addEventListeners() {
      this.lengthSlider.addEventListener('input', this.updateLength.bind(this));
      this.uppercaseCheckbox.addEventListener('change', this.updateCriteria.bind(this));
      this.lowercaseCheckbox.addEventListener('change', this.updateCriteria.bind(this));
      this.numbersCheckbox.addEventListener('change', this.updateCriteria.bind(this));
      this.symbolsCheckbox.addEventListener('change', this.updateCriteria.bind(this));
      this.generateButton.addEventListener('click', this.generatePassword.bind(this));
      this.copyButton.addEventListener('click', this.copyPassword.bind(this));
  }

  sliderEvent(event) {
     this.lengthValue = event.target.value;
  }

  updateLength() {
      this.length = parseInt(this.lengthSlider.value);
      this.lengthValue.textContent = this.length;
  }

  updateCriteria() {
      this.uppercase = this.uppercaseCheckbox.checked;
      this.lowercase = this.lowercaseCheckbox.checked;
      this.numbers = this.numbersCheckbox.checked;
      this.symbols = this.symbolsCheckbox.checked;
      this.updateStrengthIndicator();
  }

  generatePassword() {

    console.log("Yoot! Generating password");
    
      const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowerChars = "abcdefghijklmnopqrstuvwxyz";
      const numChars = "0123456789";
      const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?/";

      let characters = '';
      if (this.uppercase) characters += upperChars;
      if (this.lowercase) characters += lowerChars;
      if (this.numbers) characters += numChars;
      if (this.symbols) characters += symbolChars;

      let password = '';
      for (let i = 0; i < this.length; i++) {
          password += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      this.passwordOutput.textContent = password || 'Select Criteria';
  }

  updateStrengthIndicator() {
      const criteriaCount = [this.uppercase, this.lowercase, this.numbers, this.symbols].filter(Boolean).length;
      const strengthLevels = ['Too Weak', 'Weak', 'Medium', 'Strong'];

      // Update Label
      this.strengthLabel.textContent = strengthLevels[criteriaCount - 1] || 'Too Weak';

      // Update Bars
      this.strengthBars.forEach((bar, index) => {
          bar.classList.toggle('active', index < criteriaCount);
      });
  }

  copyPassword() {
      navigator.clipboard.writeText(this.passwordOutput.textContent);
      alert('Password copied to clipboard!');
  }
}

// Initialize the password generator
new PasswordGenerator();
