import { loadInput } from './util/loadInput.js';

// const require = createRequire(import.meta.url);

interface Passport {
	byr: string;
	iyr: string;
	eyr: string;
	hgt: string;
	hcl: string;
	ecl: string;
	pid: string;
}

const i = await loadInput();

function parsePassports(i: string) {
	return i
		.split('\n\n')
		.filter(Boolean)
		.map((e) => {
			const passport = {};
			const keyval = e
				.split('\n')
				.map((e) => e.split(' '))
				.flat()
				.map((e) => e.split(':'));
			for (const [key, val] of keyval) {
				Reflect.set(passport, key, val);
			}
			return passport as Passport;
		});
}

const schema = {
	byr(v: string) {
		const yr = parseInt(v, 10);
		return yr <= 2002 && yr >= 1920;
	},
	iyr(v: string) {
		const yr = parseInt(v, 10);
		return yr <= 2020 && yr >= 2010;
	},
	eyr(v: string) {
		const yr = parseInt(v, 10);
		return yr <= 2030 && yr >= 2020;
	},
	hgt(v: string) {
		const measure = v.slice(v.length - 2);
		const height = parseInt(v, 10);
		let result = false;
		if (measure === 'cm') {
			result = height >= 150 && height <= 193;
		} else if (measure === 'in') {
			result = height >= 59 && height <= 76;
		}

		return result;
	},
	ecl(v: string) {
		return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v);
	},
	hcl(v: string) {
		return /\#[0-9a-f]{6}/i.test(v);
	},
	pid(v: string) {
		const n = parseInt(v, 10);
		return !isNaN(n) && v.length === 9;
	}
};

function firstPart() {
	const passportList = parsePassports(i);

	const invalidPassports = passportList.filter((passport) => {
		return Object.keys(schema).filter((sk) => Reflect.has(passport, sk)).length === 0;
	});

	return `[Part 1] Found ${invalidPassports.length} invalid passports!`;
}

function secondPart() {
	const passportList = parsePassports(i);

	const validate = (object: Passport) => {
		return (
			Object.keys(schema).filter(
				(schemaKey) => !(Reflect.has(object, schemaKey) && schema[schemaKey as keyof Passport](object[schemaKey as keyof Passport]!))
			).length === 0
		);
	};

	const validPassports = passportList.filter(validate);
	return `[Part 2] Found ${validPassports.length} valid passports!`;
}

console.log(firstPart());
console.log(secondPart());
