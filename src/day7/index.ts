import { loadInput } from './util/loadInput.js';

// const require = createRequire(import.meta.url);

const input = await loadInput();

interface Bag {
	color: string;
	amount: number;
}

function holdsGold(graph: Record<string, Bag[] | true>, color: string) {
	const bag = graph[color];
	if (bag === true || typeof bag === 'undefined') return false;
	if (bag.some((v) => v.color === 'shiny gold')) return true;
	const resArray: boolean[] = bag.map((e) => holdsGold(graph, e.color));
	return resArray.some((v) => v);
}

function firstPart() {
	const graph: Record<string, Bag[] | true> = {};

	const lines = input.split('\n').filter(Boolean);
	for (const line of lines) {
		const [col, rule] = line.split(' bags contain ');
		if (rule.trim() === 'no other bags.') {
			Reflect.set(graph, col, true);
			continue;
		}

		for (const part of rule.replaceAll('bags', '').replaceAll('bag', '').replaceAll('.', '').split(',')) {
			const partArray = part.split(' ').filter(Boolean);
			const amount = parseInt(partArray.shift() ?? '', 10);
			const color = partArray.join(' ');

			Array.isArray(graph[col]) ? (graph[col] as Bag[]).push({ color, amount }) : Reflect.set(graph, col, [{ color, amount }]);
		}
	}
	console.log(graph);
	let sum = 0;
	for (const color of Object.keys(graph)) {
		if (holdsGold(graph, color)) ++sum;
	}

	return sum;
}

function secondPart() {
	return `not implemented`;
}

console.log(firstPart());
console.log(secondPart());
