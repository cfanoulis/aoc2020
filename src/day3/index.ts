import { loadInput } from './util/loadInput.js';

// const require = createRequire(import.meta.url);

function countTreesHit(grid: string[][], xStep: number, yStep: number) {
	let xCoordinate = 0;
	let yCoordinate = 0;
	let totalTrees = 0;
	const gridLength = grid[0].length;

	// For every step going down
	while (yCoordinate < grid.length) {
		// Zero-based index goes brr, but we want the next index anyway
		switch (grid[yCoordinate][xCoordinate]) {
			case '.':
				break;
			case '#':
				console.log('Ouch! I hit a tree!');
				++totalTrees;
				break;
		}

		// Go x steps down
		yCoordinate += yStep;
		// Go x steps right
		xCoordinate = xCoordinate + xStep >= gridLength ? xCoordinate + xStep - gridLength : xCoordinate + xStep;
	}

	return totalTrees;
}

const i = await loadInput();

function firstPart() {
	const grid = i
		.split('\n')
		.filter(Boolean)
		.map((e) => e.split('').filter(Boolean));

	const totalTrees = countTreesHit(grid, 3, 1);

	return `[Part 1] Oh for fucks sake, why did you have to make me hit ${totalTrees} trees!?`;
}

function secondPart() {
	const grid = i
		.split('\n')
		.filter(Boolean)
		.map((e) => e.split('').filter(Boolean));

	const trees = [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2]
	]
		.map((e) => countTreesHit(grid, e[0], e[1]))
		.reduce((p, c) => p * c);

	return `[Part 2] WHY THE FUCK DID I HAVE TO HIT ${trees} TREES AGAIN?`;
}

console.log(firstPart());
console.log(secondPart());
