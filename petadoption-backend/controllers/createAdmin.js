const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGODB_URI, {  
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000  });

const admin = new User({
  username: 'admin',
  email: 'admin@admin.com',
  password: 'password',
  role: 'admin'
});

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(admin.password, salt, async (err, hash) => {
    if (err) throw err;

    admin.password = hash;

    try {
      await admin.save();
      console.log('Admin user created successfully!');
      mongoose.connection.close();
    } catch (error) {
      console.error(error);
    }
  });
});
