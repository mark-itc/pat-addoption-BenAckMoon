const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const userController = require('../../controllers/userController');

// // Créer un utilisateur
// router.post('/register', userController.createUser);

// Obtenir un utilisateur par ID_______
router.get('/admin/allusers/:id', userController.getUserById);

// Mettre à jour un utilisateur________
router.put('/profile-settings/update', userController.updateUser);

// Obtenir tous les utilisateurs________
router.get('/admin/allusers', userController.getAllUsers);

// Supprimer un utilisateur________
router.delete('/profile-settings/delete', userController.deleteUser);

// Obtenir tous les animaux de compagnie d'un utilisateur__________
router.get('/pet/user/:id', userController.getUserPets);

// Obtenir tous les détails d'un utilisateur et de ses animaux de compagnie________
router.get('/:id/full', userController.getUserWithPets);

module.exports = router;
