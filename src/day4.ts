import main = require("./main");

main.days[4] = {
	part1: function (): string {
		return getPasswordsPart1().length.toString();
	},
	part2: function (): string {
		return getPasswordsPart1().filter(pass => {
			for(let x = -1; x < 4; x++) {
				if(pass.charAt(x) !== pass.charAt(x + 1) &&
				   pass.charAt(x + 1) === pass.charAt(x + 2) &&
				   pass.charAt(x + 2) !== pass.charAt(x + 3)) {
				     return true;
				}
			}
			return false;
		}).length.toString();
	}
}

function getPasswordsPart1(): string[] {
	let passwordMin = 172930;
	let passwordMax = 683082;
	let passwords = [];

	nextPass:
	for (let password = passwordMin; password <= passwordMax; password++) {
		let passwordStr = password.toString();
		let currentDigit = parseInt(passwordStr.charAt(0));
		let hasSame: boolean = false;
		for (let i = 1; i <= 5; i++) {
			let nextDigit = parseInt(passwordStr.charAt(i));
			if (nextDigit < currentDigit) continue nextPass;
			if (nextDigit == currentDigit) hasSame = true;
			currentDigit = nextDigit;
		}

		if (hasSame) {
			passwords.push(passwordStr);
		}
	}
	
	return passwords;
}