import { loadInput } from './util/loadInput.js';

// const require = createRequire(import.meta.url);

const i = await loadInput();

function firstPart() {
	const answers = i
		.trim()
		.split('\n\n')
		.map((e) => new Set(e.split('\n').flatMap((l) => l.trim().split(''))));
	// @ts-expect-error it really doesn't like using size
	const uniqAnsw = (answers.reduce((a, b) => (a.size ?? a) + b.size) as unknown) as number;

	return `[Part 1] Had a total of ${uniqAnsw} unique  answers!`;
}

function secondPart() {
	const answers = i
		.trim()
		.split('\n\n')
		.map((a) => a.split('\n').map((l) => l.trim().split('')));

	let sum = 0;
	for (const group of answers) {
		if (group.length === 1) {
			sum += group.flat().length;
			continue;
		}
		const allAnswers = group.flat();
		const possibles = [...new Set(allAnswers)];
		const agreedUpon = possibles.filter((arr) => allAnswers.filter((v) => arr === v).length === group.length);
		sum += agreedUpon.length;
	}

	return `[Part 2] Had a total of ${sum} answers everyone agreed upon!`;
}

console.log(firstPart());
console.log(secondPart());
