const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Mongo Database
mongoose.connect(config.database);

// Alert to SUCCESSFUL connection!
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

// Alert to Database Connection Error
mongoose.connection.on('error', (err) => {
    console.log('Database Connection Error '+err);
});

const app = express();

const users = require('./routes/users');
const parts = require('./routes/parts');

// Port Assignment
const port = 3000;

// Cross Origin Requests
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// THIS SECTION TO BE ACTIVATED AFTER NG BUILD, NG BUILD 
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
});

