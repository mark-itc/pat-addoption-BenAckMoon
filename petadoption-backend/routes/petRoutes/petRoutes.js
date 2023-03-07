const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Pet = require('../../models/pet');
const { authenticateToken, isAdmin } = require('../../middlewares/auth');
const petController = require('../../controllers/petController');



// configuration de multer pour gérer le téléchargement de photos
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// route ajout d'un animal de compagnie_______
router.post('/admin/addingpet', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const pet = new Pet({
      type: req.body.type,
      name: req.body.name,
      status: req.body.status,
      image: req.file.filename,
      height: req.body.height,
      weight: req.body.weight,
      color: req.body.color,
      bio: req.body.bio,
      hypoallergenic: req.body.hypoallergenic,
      dietaryRestrictions: req.body.dietaryRestrictions,
      breed: req.body.breed
    });

    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// route obtenir un animal de compagnie par ID_______
router.get('/admin/allpets/${id}', petController.getPet);
// async (req, res) => {
//   try {
//     const pet = await Pet.findById(req.params.id);
//     if (pet) {
//       res.json(pet);
//     } else {
//       res.status(404).send('Animal introuvable');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Erreur serveur');
//   }});

// API de modification d'un animal de compagnie
router.put('/admin/allpets/:id/updating', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      pet.type = req.body.type;
      pet.name = req.body.name;
      pet.status = req.body.status;
      if (req.file) {
        pet.image = req.file.filename;
      }
      pet.height = req.body.height;
      pet.weight = req.body.weight;
      pet.color = req.body.color;
      pet.bio = req.body.bio;
      pet.hypoallergenic = req.body.hypoallergenic;
      pet.dietaryRestrictions = req.body.dietaryRestrictions;
      pet.breed = req.body.breed;

      await pet.save();
      res.json(pet);
    } else {
      res.status(404).send('Animal introuvable');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// API de suppression d'un animal de compagnie
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      await pet.remove();
      res.json({ message: 'Animal supprimé' });
    } else {
      res.status(404).send('Animal introuvable');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour adopter un animal de compagnie
router.post('/:id/adopt', authenticateToken, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      pet.status = 'Adopted';
      pet.type = req.body.type;
      await pet.save();
      req.user.pets.push(pet._id);
      await req.user.save();
      res.json(pet);
    } else {
      res.status(404).send('Animal introuvable');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour retourner un animal de compagnie
router.post('/:id/return', authenticateToken, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      pet.status = 'Available';
      await pet.save();
      req.user.pets.pull(pet._id);
      await req.user.save();
      res.json({ message: 'Animal retourné' });
    } else {
      res.status(404).send('Animal introuvable');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour enregistrer un animal de compagnie
router.post('/:id/save', authenticateToken, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      req.user.savedPets.push(pet._id);
      await req.user.save();
      res.json({ message: 'Animal enregistré' });
    } else {
      res.status(404).send('Animal introuvable');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});
// Route pour supprimer un animal de compagnie enregistré par ID
router.delete('/:id/save', authenticateToken, async (req, res) => {
  try {
    const savedPetIndex = req.user.savedPets.indexOf(req.params.id);
    if (savedPetIndex !== -1) {
      req.user.savedPets.splice(savedPetIndex, 1);
      await req.user.save();
      res.json({ message: 'Animal enregistré supprimé' });
    } else {
      res.status(404).send('Animal enregistré introuvable');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour obtenir des animaux de compagnie par ID utilisateur
router.get('/pet/user/:id', async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.params.id });
    res.send(pets);
  } catch (error) {
    res.status(500).send({ error: "Une erreur s'est produite lors de la récupération des animaux de compagnie." });
  }
});


module.exports = router;
