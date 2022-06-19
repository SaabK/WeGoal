const router = require('express').Router();
const { registerUser, loginUser, getMe } = require('../controllers/user');
const protect = require('../middleware/authenticate');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
