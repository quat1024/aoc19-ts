import main = require("./main");
import util = require("./util");

main.days[3] = {
	part1: function() : string {
		let wires = readWireInput(util.readPuzzleInputAsString("3-1"));
		let intersections = findWireIntersections(wires);
		
		let winningIntersection : Vec2 | null = null;
		let winningManhattan = 6969420420; //Is there really no like... no maximum number const in js
		for(let intersection of intersections) {
			let m = intersection.manhattanOrigin();
			if(m < winningManhattan) {
				winningManhattan = m;
				winningIntersection = winningIntersection;
			}
		}
		
		return winningManhattan.toString();
	},
	part2: main.Stub
}

function findWireIntersections(wires: Wire[]) : Vec2[] {
	let intersections : Vec2[] = [];
	
	//for every pair of wires
	for(let a = 0; a < wires.length - 1; a++) {
		for(let b = a + 1; b < wires.length; b++) {
			let wireA = wires[a];
			let wireB = wires[b];
			
			//for every pair of their segments
			for(let i = 0; i < wireA.segments.length; i++) {
				for(let j = 0; j < wireB.segments.length; j++) {
					let segmentA = wireA.segments[i];
					let segmentB = wireB.segments[j];
					
					//TODO: Segment intersection
				}
			}
		}
	}
	
	return intersections;
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

class Wire {
	segments : WireSegment[];
	
	constructor(s : WireSegment[]) {
		this.segments = s;
	}
}

interface WireSegment {
	start : Vec2,
	end : Vec2
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
}

function readWireInput(s : string) : Wire[] {
	let wires : Wire[] = [];
	
	for(let line of s.split("\n")) {
		line = line.trim();
		if(line == "") continue;
		
		let segments : WireSegment[] = [];
		let pos = new Vec2(0, 0);
		
		for(let entry of line.split(",")) {
			let dir = dirFromChar(entry.charAt(0));
			let length = parseInt(entry.substr(1));
			
			let nextPos = pos.offset(dir, length);
			
			segments.push({
				start: pos,
				end: nextPos
			})
			
			pos = nextPos;
		}
		
		wires.push(new Wire(segments))
	}
	
	return wires;
}