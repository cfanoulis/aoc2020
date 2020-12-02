import { loadInput } from './util/loadInput.js';

// const require = createRequire(import.meta.url);
interface RegexResults {
	min: string;
	max: string;
	char: string;
	pass: string;
}

const i = await loadInput();
const regex = /^(?<min>\d+)-(?<max>\d+) (?<char>[a-zA-Z]): (?<pass>[a-z-A-Z]+)$/;

function firstPart() {
	const passwords = i
		.split('\n')
		.filter(Boolean)
		.map((e) => ((regex.exec(e)?.groups as unknown) as RegexResults) ?? false)
		.filter(Boolean)
		.filter(isValidPass);

	return `[Part 1] Valid passwords: ${passwords.length}`;

	function isValidPass({ pass, char, min, max }: RegexResults) {
		// console.log(`[Part 1] Testing password ${pass}. Policy is char ${char}, minimum ${min} & maximum ${max}`);
		const allowChars = pass.split('').filter((e) => e === char);
		// console.log(`[Part 1] Found ${allowChars.length} chars`);
		return allowChars.length >= Number(min) && allowChars.length <= Number(max);
	}
}

function secondPart() {
	const passwords = i
		.split('\n')
		.filter(Boolean)
		.map((e) => ((regex.exec(e)?.groups as unknown) as RegexResults) ?? false)
		.filter(Boolean)
		.filter(isValidPass);

	return `[Part 2] Valid passwords: ${passwords.length}`;

	function isValidPass({ pass, char, min, max }: RegexResults) {
		// console.log(`[Part 2] Testing password ${pass}. Policy is char ${char}, first pos is ${min} & second pos is ${max}`);
		// @ts-expect-error why the fuck does it whine again?
		return (pass[Number(min) - 1] === char) ^ (pass[Number(max) - 1] === char);
	}
}

console.log(firstPart());
console.log(secondPart());
