const express = require('express');
const router = express.Router();


const User = require('../models/User');

//router.get('/test', (req, res) => res.json({msg: 'User works!'}));

// @route   POST  api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  // lookin the MongDb collection and find one
  User.findOne({email: req.body.email})
    .then( user => {
      if (user) {
        return res.status(400).json({email: 'Email already exists!'})
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
      }
    })
    .catch()
})

module.exports = router;