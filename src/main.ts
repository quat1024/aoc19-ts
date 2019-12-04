export interface Challenge {
	(): string;
}

export interface Day {
	part1 : Challenge;
	part2 : Challenge;
}

export function Stub(): string {
	throw "Stub, not defined";
}

export var days : Day[] = [];

//////////////////////

//hooks them into the day array above b/c it happens at require time
//This is bad... what is the right way to do this.
require("./day1");
require("./day2");
require("./day3_try2");
require("./day4")

//work the magic
let arg = process.argv[2];
let argP = arg.split("-").map(x => parseInt(x));
let day = days[argP[0]];
let chal = argP[1] === 1 ? day.part1 : day.part2;

console.log("Running puzzle " + arg);

console.log(chal());