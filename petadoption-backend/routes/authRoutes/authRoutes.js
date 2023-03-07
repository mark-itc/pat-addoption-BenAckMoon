const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../../controllers/authContoller');

const router = express.Router();

// Register a new user_____
router.post('/register', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  check('firstName').notEmpty(),
  check('lastName').notEmpty(),
  check('phoneNumber').isMobilePhone(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  authController.register(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
});


// Login a user________
router.post('/login', authController.login);

module.exports = router;
