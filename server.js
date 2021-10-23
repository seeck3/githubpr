const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express();


// Init Middleware
app.use(express.json({ extended: false }));

app.use(cors())

// Define Routes
app.use('/api/github', require('./routesAPI/github'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));