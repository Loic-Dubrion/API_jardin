const authorizeUser = (req, res, next) => {
  const userId = Number(req.params.userId);

  if (!req.session.user) {
    return res.status(403).json({ error: 'Non autorisé' });
  }

  if (userId && userId !== req.session.user.id) {
    return res.status(403).json({ error: 'Non autorisé' });
  }

  next();

  return undefined; // For esLint "Expected to return a value at the end of arrow function"
};

module.exports = authorizeUser;
