const { Queue } = require('@datastructures-js/queue');

// teams = [1, 2, 6, 7]
function matchmaking(teams) {
	// Shuffle items
	const shuffledTeams = shuffle(teams);

	// Initialize a queue
	const queue = new Queue()

	// Queue all teams
	shuffledTeams.forEach(team => queue.enqueue(team));

	return dequeueByPairs(queue)
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function dequeueByPairs(queue) {
	const pairs = [];

	while (!queue.isEmpty()) {
		const first = queue.dequeue();
		const second = queue.dequeue();
		pairs.push([first, second]);
	}

	return pairs;
}

module.exports = matchmaking;