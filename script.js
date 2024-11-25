class PasswordGenerator {
    constructor() {
        this.upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.lowerChars = "abcdefghijklmnopqrstuvwxyz";
        this.numChars = "0123456789";
        this.symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?/";
    }

    generate(length, options) {
        const { uppercase, lowercase, numbers, symbols } = options;
        let characters = '';

        if (uppercase) characters += this.upperChars;
        if (lowercase) characters += this.lowerChars;
        if (numbers) characters += this.numChars;
        if (symbols) characters += this.symbolChars;

        if (!characters) {
            throw new Error('No criteria selected!');
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return password;
    }
}

export  default PasswordGenerator;