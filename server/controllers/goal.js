const asyncHandler = require('express-async-handler');
const Goal = require('../models/goal');

const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({});

	res.status(200).json(goals);
});

const createGoal = asyncHandler(async (req, res) => {
	const { text } = req.body;
	if (!text) {
		res.status(400);
		throw new Error('Please add a text field!');
	}

	const goal = await Goal.create({
		text,
	});

	res.json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const thatOneGoal = await Goal.findById(id);

	if (!thatOneGoal) {
		res.status(400);
		throw new Error('Goal not found');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
	res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const thatOneGoal = await Goal.findById(id);

	if (!thatOneGoal) {
		res.status(400);
		throw new Error('Goal not found');
	}

	await thatOneGoal.remove();

	res.json({ message: `Deleted goal with an id of ${id}` });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
