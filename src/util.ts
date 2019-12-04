import fs = require("fs");
import path = require("path");

export function readPuzzleInputAsString(suffix : string) : string {
	return fs.readFileSync("puzzle_inputs" + path.sep + "day" + suffix + ".txt").toString("utf8");
}

export function readPuzzleInputAsCsv(suffix : string) : string[] {
	return readPuzzleInputAsString(suffix).split(",");
}