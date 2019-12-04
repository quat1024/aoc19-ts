import main = require("./main");
import util = require("./util");

main.days[2] = {
	part1: function() : string {
		let computer : IntcodeState = {
			instructionPointer: 0,
			memory: util.readPuzzleInputAsCsv("2-1").map(x => parseInt(x)),
			//memory: "1,9,10,3,2,3,11,0,99,30,40,50".split(",").map(x => parseInt(x)),
			status: Status.RUNNING
		}

		computer.memory[1] = 12;
		computer.memory[2] = 2;

		runIntcodeComputerUntilHalt(computer);

		return printIntcodeComputer(computer);
	},

	part2: function() : string {

		let prototypicalMemory : number[] = util.readPuzzleInputAsCsv("2-1").map(x => parseInt(x));

		//Brute-force it?
		for(let noun = 0; noun < 99; noun++) {
			for(let verb = 0; verb < 99; verb++) {
				let computer : IntcodeState = {
					instructionPointer: 0,
					memory: prototypicalMemory.slice(0),
					status: Status.RUNNING
				}

				computer.memory[1] = noun;
				computer.memory[2] = verb;

				console.log("Trying n " + noun + " v " + verb);

				runIntcodeComputerUntilHalt(computer);

				if(computer.status == Status.RUNNING) {
					console.log("n " + noun + " v " + verb + " didn't halt within a short time")
					continue;
				}

				if(computer.memory[0] == 19690720) { //magic target value
					return (100 * noun + verb).toString();
				}
			}
		}

		throw "Couldn't find a noun/verb pair that would do it...";
	}
}


// "keep it nearby" in the day2 part2 text... :thinking:

enum Status {
	RUNNING = 0,
	HALTED
}

interface IntcodeState {
	instructionPointer : number;
	memory : number[];
	status : Status;
}

function runIntcodeComputerUntilHalt(computer : IntcodeState, maxAttempts = 10000) : IntcodeState {
	//console.log(printIntcodeComputer(computer))
	let tries = 0;
	while(computer.status != Status.HALTED && tries < maxAttempts) {
		stepIntcodeComputer(computer);
		tries++;
		//console.log(printIntcodeComputer(computer))
	}
	return computer;
}

function stepIntcodeComputer(computer : IntcodeState) : void {
	let currentOpcode = computer.memory[computer.instructionPointer];

	switch(currentOpcode) {
		case 1: {
			let operand1 = computer.memory[computer.memory[computer.instructionPointer + 1]];
			let operand2 = computer.memory[computer.memory[computer.instructionPointer + 2]];
			let target = computer.memory[computer.instructionPointer + 3];

			computer.memory[target] = operand1 + operand2;
			computer.instructionPointer += 4;
			break;
		}

		case 2: {
			//cut n paste!
			let operand1 = computer.memory[computer.memory[computer.instructionPointer + 1]];
			let operand2 = computer.memory[computer.memory[computer.instructionPointer + 2]];
			let target = computer.memory[computer.instructionPointer + 3];

			computer.memory[target] = operand1 * operand2;
			computer.instructionPointer += 4;
			break;
		}

		case 99: {
			computer.status = Status.HALTED;
			break;
		}

		default: {
			throw "Unknown opcode " + currentOpcode;
		}
	}
}

function printIntcodeComputer(computer : IntcodeState) : string {
	return computer.memory.map((value, index) => {
		if(index === computer.instructionPointer) {
			return "[" + value.toString() + "]";
		} else return value.toString();
	}).toString();
}