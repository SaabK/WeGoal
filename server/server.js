const express = require('express');
const colors = require('colors');
const app = express();
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config();

connectDB();

// To access body:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes:
app.use('/api/goals', require('./routes/goal'));
app.use('/api/users', require('./routes/user'));

// Middlewares:
app.use(errorHandler);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App listening on port ${port}!`));
