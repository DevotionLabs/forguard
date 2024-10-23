export const areArraysEqual = (array1: string[], array2: string[]): boolean => {
	return array1.length === array2.length && array1.every((item) => array2.includes(item));
};
