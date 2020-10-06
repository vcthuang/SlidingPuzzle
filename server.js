const express = require ('express');
const mongoose = require ('mongoose');
const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// connnect to Mongo DB
// use promise statement
mongoose
  .connect(db)
  .then( () => console.log('MongDB connected!'))
  .catch( err => console.log(err));

// first route
// first parameter is route: '/'
// second paramter is an arrow function with two parameters: req & res
app.get('/', (req, res) => res.send('Hello world!'));

const port = 8080;
// tell express to listen to this port number
// can use concatenation, but `` is better
app.listen(port, () => console.log(`Server running on port ${port}`));


