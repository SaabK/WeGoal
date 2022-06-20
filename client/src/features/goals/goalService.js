import axios from 'axios';

const API_URL = '/api/goals/';

// Create goal
const createGoal = async (goalData, token) => {
	const config = {
		headers: {
			'x-auth-token': `${token}`,
		},
	};

	const response = await axios.post(API_URL, goalData, config);

	return response.data;
};

// Get goals
const getGoals = async token => {
	const config = {
		headers: {
			'x-auth-token': `${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

// Delete goal
const deleteGoal = async (goalId, token) => {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = await axios.delete(`${API_URL}${goalId}`, config);
	// console.log(response);

	return response.data;
};

const goalService = {
	createGoal,
	getGoals,
	deleteGoal,
};

export default goalService;
