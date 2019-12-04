import main = require("./main");
import util = require("./util");

main.days[3] = {
	part1: function() : string {
		let wires = readWireInput(util.readPuzzleInputAsString("3-1"));
		
		let intersectedPoints : Vec2[] = [];
		
		//for every pair of wires
		for(let a = 0; a < wires.length - 1; a++) {
			for(let b = a + 1; b < wires.length; b++) {
				let wireA = wires[a];
				let wireB = wires[b];
				
				//Find the intersection of the point clouds
				for(let i = 0; i < wireA.length; i++) {
					for(let j = 0; j < wireB.length; j++) {
						let pointA = wireA[i];
						let pointB = wireB[j];
						if(pointA.equals(pointB)) {
							intersectedPoints.push(pointA);
							continue;
						}
					}
				}
			}
		}
		
		//find the smallest manhattan distance
		let winningIntersection : Vec2 | null = null;
		let winningManhattan = 6969420420; //Is there really no like... no maximum number const in js
		for(let intersection of intersectedPoints) {
			let m = intersection.manhattanOrigin();
			if(m == 0) continue;
			if(m < winningManhattan) {
				winningManhattan = m;
				winningIntersection = winningIntersection;
			}
		}
		
		return winningManhattan.toString();
	},
	part2: main.Stub
}

enum Direction {
	UP = 0,
	RIGHT,
	DOWN,
	LEFT
}

function xDirComponent(d : Direction) : number {
	if(d === Direction.UP || d === Direction.DOWN) return 0;
	else return d === Direction.LEFT ? -1 : 1;
}

function yDirComponent(d : Direction) : number {
	if(d == Direction.LEFT || d == Direction.RIGHT) return 0;
	else return d == Direction.UP ? 1 : -1;
}

function dirFromChar(s : String) : Direction {
	switch(s) {
		case "U": return Direction.UP;
		case "R": return Direction.RIGHT;
		case "D": return Direction.DOWN;
		case "L": return Direction.LEFT;
		default: throw "invalid direction char " + s;
	}
}

class Vec2 {
	x : number;
	y : number;
	
	constructor(x : number, y : number) {
		this.x = x;
		this.y = y;
	}
	
	offset(dir : Direction, dist : number) : Vec2 {
		return new Vec2(
			this.x + xDirComponent(dir) * dist,
			this.y + yDirComponent(dir) * dist
		)
	}
	
	manhattanOrigin() : number {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	
	copy() : Vec2 {
		return new Vec2(this.x, this.y);
	}
	
	equals(other : Vec2) : boolean {
		return this.x == other.x && this.y == other.y;
	}
}

function readWireInput(s : string) : Vec2[][] {
	let wires : Vec2[][] = [];
	
	for(let line of s.split("\n")) {
		line = line.trim();
		if(line == "") continue;
		
		let wire : Vec2[] = [];
		let pos = new Vec2(0, 0);
		
		for(let entry of line.split(",")) {
			let dir = dirFromChar(entry.charAt(0));
			let length = parseInt(entry.substr(1));
			
			for(let i = 0; i < length; i++) {
				wire.push(pos.offset(dir, i));
			}
			
			pos = pos.offset(dir, length);
		}
		
		wires.push(wire)
	}
	
	return wires;
}