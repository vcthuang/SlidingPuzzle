const express = require('express');
const router = express.Router();

const User = require('../models/User');

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

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
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,  //default - display mystery man for all 
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err=> console.log(err))
          })
        })
      }
    })
    .catch(err=> console.log(err))
});

// @route   POST  api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(404).json({email: 'User not found'});
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then( isMatch => {
            if (isMatch) {
              //return res.json({msg: 'Success!'})
              // user matched, now generate a token
              // pay load shall not have password, or anything sensitive
              const payload = {id: user.id, name: user.name, avatar: user.avatar};

              // sign token
              jwt.sign(
                payload, 
                keys.secretOrKey, 
                {expiresIn: 3600},     // option: expiration
                (err, token) => {
                  res.json({success: true,
                  token: 'Bearer ' + token});
                }
                )

            } else {
              return res.status(400).json({password: 'Password incorrect'});
            }
          })
      }
    })
    .catch(err=> console.log(err));
})

module.exports = router;