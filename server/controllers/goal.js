const asyncHandler = require('express-async-handler');

const getGoals = asyncHandler(async (req, res) => {
	res.json({ message: 'Got Goal' });
});

const createGoal = asyncHandler(async (req, res) => {
	const { text } = req.body;
	if (!text) {
		res.status(400);
		throw new Error('Please add a text field!');
	}

	res.json({ message: 'Created Goal' });
});

const updateGoal = asyncHandler(async (req, res) => {
	res.json({ message: 'Created Goal' });
});

const deleteGoal = asyncHandler(async (req, res) => {
	res.json({ message: `Deleted goal with an id of ${req.params.id}` });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
