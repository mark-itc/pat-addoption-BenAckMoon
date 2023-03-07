const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function isAdmin(req, res, next) {
  const userId = req.user.id;

  User.findById(userId, (err, user) => {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(401);
    if (user.role !== 'admin') return res.sendStatus(403);
    next();
  });
}

module.exports = { authenticateToken, isAdmin };


