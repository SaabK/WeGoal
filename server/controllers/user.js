const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Checking if the fields are filled:
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please fill all the fields!');
	}

	const thatOneUser = await User.findOne({ email });

	// Checking if the user is duplicate
	if (thatOneUser) {
		res.status(400);
		throw new Error('User already exists!');
	}

	// Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create a new user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	res.json({
		message: 'user registered!',
		_id: user._id,
		name: user.name,
		email: user.email,
		token: generateToken(user.id),
	});
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Checking if the fields are filled:
	if (!email || !password) {
		res.status(400);
		throw new Error('Please fill all the fields!');
	}

	// Check for user email
	const thatOneUser = await User.findOne({ email });

	if (thatOneUser && (await bcrypt.compare(password, thatOneUser.password))) {
		// Create JWT
		return res.json({
			message: 'user logged!',
			id: thatOneUser._id,
			name: thatOneUser.name,
			email: thatOneUser.email,
			token: generateToken(thatOneUser.id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials!');
	}
});

const getMe = asyncHandler(async (req, res) => {
	const { id, name, email } = req.user;
	res.status(200).json({ message: 'fetched user data', id, name, email });
});

// Generate token
const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
