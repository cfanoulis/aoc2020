// @ts-ignore ES imports are broken
import { Combination } from 'js-combinatorics/commonjs/combinatorics.js'; // I do love me some hacks
import { loadInput } from './util/loadInput.js';

// const require = createRequire(import.meta.url);

const i = await loadInput();
const numbers = i.split('\n').map((e) => parseInt(e, 10));
let cont = true;

while (cont) {
	const num1 = numbers.shift();
	if (typeof num1 === 'undefined') throw new Error('Why the cinnamon toast fuck was num1 undefined?');
	const res = numbers.map((e) => num1 + e);
	const index = res.findIndex((e) => e === 2020);
	if (index === -1) continue;
	cont = false;
	console.log(`[Part 1] WE HAVE THE NUMBER! IT IS ${num1 * numbers[index]}`);
}

const nums = new Combination(numbers, 3) as number[][]; // Am I cheating with this type? Slightly
for (const [n1, n2, n3] of nums) {
	console.log(`[Part 2] Testing ${n1}, ${n2}, ${n3}`);
	if (n1 + n2 + n3 === 2020) {
		console.log(`[Part 2] AND ANOTHER ONE! Now the number is ${n1 * n2 * n3}`);
		break;
	}
}
