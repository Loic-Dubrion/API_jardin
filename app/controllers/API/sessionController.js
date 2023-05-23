const bcrypt = require('bcrypt');
const session = require('express-session');
const userDatamapper = require('../../models/userDataMapper');
const controllerHandler = require('../helpers/controllerHandler');
const UnauthorizedError = require('../../errors/UnauthorizedError');

const sessionController = {

  login: controllerHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userDatamapper.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Utilisateur ou mot de passe incorrect');
    }

    const isGoodPassword = await bcrypt.compare(password, user.password);

    if (!isGoodPassword) {
      throw new UnauthorizedError('Utilisateur ou mot de passe incorrect');
    }

    req.session.user = { username: user.username, email: user.email, role: user.role };

    return res.status(200).json({ message: 'Utilisateur connecté avec succès', user: req.session.user });
  }),

  logout: controllerHandler((req, res) => {
    req.session.user = null;
    return res.status(200).json({ message: 'Déconnexion réussie' });
  }),
};

module.exports = sessionController;
