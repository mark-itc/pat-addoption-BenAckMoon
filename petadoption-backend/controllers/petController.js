const { validationResult } = require('express-validator');
const User = require('../models/user');
const Pet = require('../models/pet');
const { isAdmin } = require('../middleware/auth');

// Create a new pet_______
exports.createPet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, breed, age } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const pet = new Pet({ name, breed, age, user: userId });
    await pet.save();
    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Get a pet by ID________
exports.getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('user', '-password');
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Update a pet______
// exports.updatePet = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     const { name, breed, age } = req.body;
//     const pet = await Pet.findById(req.params.id);
//     if (!pet) {
//       return res.status(404).json({ error: 'Pet not found' });
//     }
//     const userId = req.user.id;
//     if (pet.user.toString() !== userId && !isAdmin(req)) {
//       return res.status(403).json({ error: 'Unauthorized' });
//     }
//     pet.name = name || pet.name;
//     pet.breed = breed || pet.breed;
//     pet.age = age || pet.age;
//     await pet.save();
//     res.json(pet);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


// Delete a pet

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    const userId = req.user.id;
    if (pet.user.toString() !== userId && !isAdmin(req)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await pet.remove();
    res.json({ message: 'Pet removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
