const isNumberTeamsValid = require('./isNumberTeamsValid')
const { describe, test, expect } = require('@jest/globals')


describe('isNumberTeamsValid', () => {
	test('returns false for 0', () => {
		expect(isNumberTeamsValid(0)).toBe(false);
	});

	test('returns false for 1', () => {
		expect(isNumberTeamsValid(1)).toBe(false);
	});

	test('returns true for 2', () => {
		expect(isNumberTeamsValid(2)).toBe(true);
	});

	test('returns true for 4', () => {
		expect(isNumberTeamsValid(4)).toBe(true);
	});

	test('returns false for 3', () => {
		expect(isNumberTeamsValid(3)).toBe(false);
	});

	test('returns true for 16', () => {
		expect(isNumberTeamsValid(16)).toBe(true);
	});

	test('returns false for 18', () => {
		expect(isNumberTeamsValid(18)).toBe(false);
	});
});