function validateUser(req, res, next) {
    const { email, password, confirmPassword, firstName, lastName, phoneNumber } = req.body;
    if ( !email || !password || !confirmPassword || !firstName|| !lastName|| !phoneNumber ) {
      return res.status(400).send('Tous les champs sont requis');
    }
    next();
  }
  
  function validatePet(req, res, next) {
    const { type, name, status, height, weight, color, breed } = req.body;
    if (!type || !name || !status || !height || !weight || !color || !breed) {
      return res.status(400).send('Tous les champs sont requis');
    }
    next();
  }
  
  module.exports = { validateUser, validatePet };