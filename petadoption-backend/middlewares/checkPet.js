const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');

const checkPet = async (req, res, next) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id });
    if (!pet) {
      return res.status(404).send({ error: "Animal de compagnie introuvable." });
    }
    req.pet = pet;
    next();
  } catch (error) {
    res.status(500).send({ error: "Une erreur s'est produite lors de la recherche de l'animal de compagnie." });
  }
};

module.exports = checkPet;
