const User = require('../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
	const token = req.header('x-auth-token');

	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		// Verify token
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);

		// Add user to request object
		req.user = await User.findById(decoded.id).select('-password');

		next();
	} catch (err) {
		console.log(err);

		res.status(401);
		throw new Error('Token is not valid');
	}
});

module.exports = protect;
