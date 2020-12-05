import { loadInput } from './util/loadInput.js';

// const require = createRequire(import.meta.url);

const enum Instruction {
	LowerRow = 'F',
	HigherRow = 'B',
	LowerColumn = 'L',
	HigherColumn = 'R'
}

const i = await loadInput();

function parseSeatId(passId: string) {
	const instructions = passId.trim().split('').filter(Boolean) as Instruction[];

	const rowIds = new Array(128).fill(undefined).map((_, i) => i);
	const colIds = new Array(8).fill(undefined).map((_, i) => i);

	for (const instruction of instructions) {
		switch (instruction) {
			case Instruction.HigherRow:
				rowIds.splice(0, Math.floor(rowIds.length / 2));
				break;
			case Instruction.LowerRow:
				rowIds.splice(Math.floor(rowIds.length / 2));
				break;
			case Instruction.HigherColumn:
				colIds.splice(0, Math.floor(colIds.length / 2));
				break;
			case Instruction.LowerColumn:
				colIds.splice(Math.floor(colIds.length / 2));
				break;
			default:
				throw new Error(`Uhm I didn't understand instruction ${instruction}`);
		}
	}

	if (rowIds.length !== 1 || colIds.length !== 1) throw new Error("Something went really wrong, I don't have my IDs all right!");
	return Number(rowIds[0]) * 8 + Number(colIds[0]);
}
function firstPart() {
	const seatIDs = i
		.split('\n')
		.filter(Boolean)
		.map(parseSeatId)
		.sort((a, b) => a - b);

	return `[Part 1] The largest ID is ${seatIDs[seatIDs.length - 1]}!`;
}

function secondPart() {
	const seatIDs = i.split('\n').filter(Boolean).map(parseSeatId);

	let mySeat = 0;
	for (const seat of seatIDs) {
		const possibleSeat = seat + 1;
		const nextPosSeat = seat + 2;
		if (!seatIDs.includes(possibleSeat) && seatIDs.includes(nextPosSeat)) {
			mySeat = seat + 1;
			break;
		}
	}

	return `[Part 2] My seat must be ${mySeat}!`;
}

console.log(firstPart());
console.log(secondPart());
