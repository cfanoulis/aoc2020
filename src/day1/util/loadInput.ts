import { readFile } from 'fs/promises';

export const loadInput = () => readFile('./input', { encoding: 'ascii' });
