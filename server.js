const express = require ('express');
const mongoose = require ('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');
const app = express();

const bodyParser = require('body-parser');
// Body parser middleware HTML -> json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connnect to Mongo DB
// use promise statement
mongoose
  .connect(db)
  .then( () => console.log('MongDB connected!'))
  .catch( err => console.log(err));


// passport middleware
app.use(passport.initialize());
// passport config
require('./config/passport')(passport); // this passport is passport defined in passport.js

// first route
// first parameter is route: '/'
// second paramter is an arrow function with two parameters: req & res
app.get('/', (req, res) => res.send('Hello world!'));

// route to appropriate files
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = 8080;
// tell express to listen to this port number
// can use concatenation, but `` is better
app.listen(port, () => console.log(`Server running on port ${port}`));


