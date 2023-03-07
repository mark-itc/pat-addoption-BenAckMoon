const User = require('../models/user');
const Pet = require('../models/pet');
const { validationResult } = require('express-validator');

// Get all users___________
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new user
// exports.createUser = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     const { email, password, role } = req.body;
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     // Create the user
//     const user = new User({ email, password: hashedPassword });
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// Get a user by ID__________
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a user________
exports.updateUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, password, firstName, lastName, phoneNumber, bio },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a user________
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Obtenir tous les animaux de compagnie d'un utilisateur_______
exports.getUserPets = async (req, res) => {
  try {
    const userPets = await Pet.find({ owner: req.params.id });
    res.json(userPets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Obtenir tous les détails d'un utilisateur et de ses animaux de compagnie__________
exports.getUserWithPets = async (req, res) => {
  try {
    // Obtenir l'utilisateur
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Obtenir les animaux de compagnie de l'utilisateur
    const pets = await Pet.find({ owner: user._id });

    res.json({
      user,
      pets
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};