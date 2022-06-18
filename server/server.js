const express = require('express');
const app = express();
const { errorHandler } = require('./middleware/errorHandler');
const port = process.env.PORT || 5000;

// To access body:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes:
app.use('/api/goals', require('./routes/goal'));

// Middlewares:
app.use(errorHandler);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App listening on port ${port}!`));
