const router = require('express').Router();
const {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers/goal');
const protect = require('../middleware/authenticate');

router.route('/').get(protect, getGoals).post(protect, createGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
