const bcrypt = require('bcrypt');
const session = require('express-session');
const userDatamapper = require('../../models/userDataMapper');
const UnauthorizedError = require('../../errors/UnauthorizedError');

const sessionController = {

  async login(request, response) {
    const { email, password } = request.body;

    const result = await userDatamapper.getUserByEmail(email);

    if (!result.rows || result.rows.length === 0) {
      throw new UnauthorizedError('Utilisateur ou mot de passe incorrect');
    }

    const user = result.rows[0];
    const isGoodPassword = await bcrypt.compare(password, user.password);

    if (!isGoodPassword) {
      throw new UnauthorizedError('Utilisateur ou mot de passe incorrect');
    }

    request.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.id_role,
    };
    return response.status(200).json({ message: 'Utilisateur connecté avec succès', user: request.session.user });
  },

  logout(request, response) {
    request.session.user = null;
    return response.status(200).json({ message: 'Déconnexion réussie' });
  },
};

module.exports = sessionController;
