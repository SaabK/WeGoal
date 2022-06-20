const asyncHandler = require('express-async-handler');
const Goal = require('../models/goal');

const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	// console.log(goals);

	res.status(200).json(goals);
});

const createGoal = asyncHandler(async (req, res) => {
	const { text } = req.body;
	const { id } = req.user;

	if (!text) {
		res.status(400);
		throw new Error('Please add a text field!');
	}

	const goal = await Goal.create({
		text,
		user: id,
	});

	res.json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = req.user;

	const thatOneGoal = await Goal.findById(id);

	if (!thatOneGoal) {
		res.status(400);
		throw new Error('Goal not found');
	}

	if (!user) {
		res.status(400);
		throw new Error('User not found');
	}

	// Make sure user is owner of goal
	if (thatOneGoal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('You are not authorized to update this goal');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
	res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = req.user;

	const thatOneGoal = await Goal.findById(id);

	if (!thatOneGoal) {
		res.status(400);
		throw new Error('Goal not found');
	}

	if (!user) {
		res.status(400);
		throw new Error('User not found');
	}

	// Make sure user is owner of goal
	if (thatOneGoal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('You are not authorized to update this goal');
	}

	await thatOneGoal.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
