function isNumberTeamsValid(n) {
	return n > 1 && (n & (n - 1)) === 0;
}

module.exports = isNumberTeamsValid;