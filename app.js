// Load dependencies 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
// Set variables
const app = express();
const port = 3000;
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



// CORS Middleware
app.use(cors());
// Body Parser Middleware
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Catch bad JSON to prevent hackers from crashing the server by sending bad info
app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
  }
});



// Routes
app.use('/users', users);
app.get('/', (req, res) => {
	res.send('Invalid endpoint');
})
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});



// Connect to database 
mongoose.connect(config.database,{ useNewUrlParser: true });
// On connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' +config.database)
});
mongoose.connection.on('error', (err) => {
	console.log('Database error ' +err)
});



// Start server
app.listen(port, () => {
	console.log('Server started on port '+port);
})