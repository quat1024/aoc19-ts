import fs = require("fs");
import path = require("path");

import main = require("./main");
import util = require("./util");

main.days[1] = {
	part1: function() : string {
		let challenge = util.readPuzzleInputAsString("1-1");

		return challenge
			.split("\n") //split
			.map(str => str.trim()) //clean
			.filter(str => str !== "")
			.map(str => parseInt(str)) //parse to ints
			.map(x => Math.floor(x / 3) - 2) //compute
			.reduce((x, y) => x + y)
			.toString()
	},

	part2: function() : string {
		let challenge = util.readPuzzleInputAsString("1-1"); //Same input

		//console.log(recursiveFuel(100756));

		return challenge
			.split("\n") //split
			.map(str => str.trim()) //clean
			.filter(str => str !== "")
			.map(str => parseInt(str)) //parse to ints
			.map(x => recursiveFuel(x))
			.reduce((x, y) => x + y)
			.toString()
	}
}

function recursiveFuel(x : number) : number {
	let sum = 0;
	while(true) {
		x = Math.floor(x / 3 - 2);
		if(x <= 0) break;
		else sum += x;
	}

	return sum;
}