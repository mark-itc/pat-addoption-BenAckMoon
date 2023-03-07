const mongoose = require('mongoose');
const User = mongoose.model('User');

const checkUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ error: "Une erreur s'est produite lors de la recherche de l'utilisateur." });
  }
};

module.exports = checkUser;