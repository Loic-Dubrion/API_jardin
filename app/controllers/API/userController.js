const dataMapper = require('../../models/userDataMapper');
const NoResourceFoundError = require('../../errors/NoResourceFoundError');
const ForbiddenError = require('../../errors/ForbiddenError');

const userController = {

  //! Controller for Reading
  async getAllUsers(request, response) {
    const result = await dataMapper.getAllUsers();
    response.json(result.rows);
  },

  async getProfil(request, response) {
    const userId = Number(request.params.userId);
    const result = await dataMapper.getProfil(userId);
    if (result.rows.length === 0) {
      throw new NoResourceFoundError(`User with ID ${userId} not found.`);
    } else {
      response.json(result.rows);
    }
  },

  async getProduction(request, response, isHarvestingNull, plotIdParam = null, cultIdParam = null) {
    const userId = Number(request.params.userId);
    const plotId = plotIdParam ? Number(request.params.plotId) : null;
    const cultureId = cultIdParam ? Number(request.params.cultureId) : null;
    const result = await dataMapper.getProduction(userId, isHarvestingNull, plotId, cultureId);
    response.json(result.rows);
  },

  async getLastCategories(request, response) {
    const plotId = Number(request.params.plotId);
    const userId = Number(request.params.userId);

    const plot = await dataMapper.findPlotByIdAndUserId(plotId, userId);
    console.log(plot.rows);
    if (!plot.rows === null) {
      const result = await dataMapper.getLastCultures(plotId);
      response.json(result.rows);
    } else {
      throw new ForbiddenError(`Plot with ID ${plotId} not found or doesn't belong to the user`);
    }
  },

  async getAlliancesForPlot(request, response) {
    const plotId = Number(request.params.plotId);
    const userId = Number(request.params.userId);
    // Call to datamapper.Getproduction to obtain the families of plants from the plot
    const plantFamilies = await dataMapper.getProduction(userId, true, plotId);

    if (plantFamilies.rows.length === 0) {
      throw new NoResourceFoundError('Alliance for this plot not found.');
    } else {
      // Sinon, on va chercher les alliances pour chaque famille de plantes.
      // Chaque demande d'alliance est asynchrone, on utilise donc Promise.all
      // "then" retourne un objet qui contient le nom de la famille de plantes et son alliance
      const alliancePromises = plantFamilies.rows.map(
        (plantFamily) => dataMapper.getAlliance(plantFamily.family_id).then((alliance) => ({
          family_name: plantFamily.family_name,
          alliance: alliance.rows.length > 0 ? alliance.rows[0] : {},
        })),
      );

      const alliances = await Promise.all(alliancePromises);
      // Reduces the table of objects into a single object where the keys are family names
      // and values are the associated alliances
      const results = alliances.reduce((acc, { familyName, alliance }) => {
        acc[familyName] = alliance;
        return acc;
      }, {});

      if (Object.keys(results).length === 0) {
        response.status(404).json({ status: 404, error: 'No alliances found for the plant family.' });
      } else {
        response.json(results);
      }
    }
  },

  //! Controller for Creating
  async insertUser(request, response) {
    const newUser = await dataMapper.insertUser(request.body);
    response.status(201).json(newUser.rows[0]);
  },

  async insertPlot(request, response) {
    const userId = Number(request.params.userId);
    const newPlot = await dataMapper.insertPlot(userId, request.body);
    response.status(201).json(newPlot.rows[0]);
  },

  async insertCulture(request, response) {
    const { userId, plotId } = request.params;

    // Rechercher le parcelle appartenant à cet utilisateur
    const plot = await dataMapper.findPlotByIdAndUserId(Number(plotId), Number(userId));

    // Si aucune parcelle n'est trouvée, renvoyer une erreur
    if (plot.rows.length === 0) {
      throw new ForbiddenError('User does not have permission to add culture to this plot.');
    }

    // Sinon, continuer avec l'insertion de la culture
    const newCulture = await dataMapper.insertCulture(Number(plotId), request.body);
    return response.status(201).json(newCulture.rows[0]);
  },

  //! Controller for Updating
  async updateUser(request, response) {
    const updatedUser = await dataMapper.updateUser(request.body, request.params.userId);
    response.status(200).json(updatedUser.rows[0]);
  },

  async updatePlot(request, response) {
    const { userId, plotId } = request.params;

    // Rechercher le plot appartenant à cet utilisateur
    const plot = await dataMapper.findPlotByIdAndUserId(Number(plotId), Number(userId));

    // Si aucun plot n'est trouvé, renvoyer une erreur
    if (plot.rows.length === 0) {
      return response.status(403).json({ error: 'User does not have permission to update this plot.' });
    }

    // Sinon, continuer avec la mise à jour du plot
    const updatedPlot = await dataMapper.updatePlot(request.body, Number(plotId));
    return response.status(200).json(updatedPlot.rows[0]);
  },

  async updateCulture(request, response) {
    const { userId, cultureId } = request.params;

    // Rechercher la culture appartenant à cet utilisateur
    const culture = await dataMapper.findCultureByIdAndUserId(Number(cultureId), Number(userId));

    // Si aucune culture n'est trouvée, renvoyer une erreur
    if (culture.rows.length === 0) {
      return response.status(403).json({ error: 'User does not have permission to update this culture.' });
    }

    // Sinon, continuer avec la mise à jour de la culture
    const updatedCulture = await dataMapper.updateCulture(request.body, Number(cultureId));
    return response.status(200).json(updatedCulture.rows[0]);
  },

  //! Controller for Delete
  async deleteUser(request, response) {
    const userId = Number(request.params.userId);
    const existingUser = await dataMapper.getProfil(userId);
    if (existingUser.rows.length === 0) {
      throw new NoResourceFoundError(`User with ID ${userId} not found.`);
    }
    await dataMapper.deleteUser(userId);
    response.status(200).json(
      { status: 200, message: `User with id: ${userId} successfully deleted.` },
    );
  },

  async deletePlot(request, response) {
    const { userId, plotId } = request.params;

    // Rechercher le plot appartenant à cet utilisateur
    const plot = await dataMapper.findPlotByIdAndUserId(Number(plotId), Number(userId));

    // Si aucun plot n'est trouvé, renvoyer une erreur
    if (plot.rows.length === 0) {
      return response.status(403).json({ error: 'User does not have permission to delete this plot.' });
    }

    // Sinon, continuer avec la suppression du plot
    await dataMapper.deletePlot(Number(plotId));
    return response.status(200).json(
      { status: 200, message: `Plot with id: ${plotId} successfully deleted.` },
    );
  },

  async deleteCulture(request, response) {
    const { userId, cultureId } = request.params;

    // Rechercher la culture appartenant à cet utilisateur
    const culture = await dataMapper.findCultureByIdAndUserId(Number(cultureId), Number(userId));

    // Si aucune culture n'est trouvée, renvoyer une erreur
    if (culture.rows.length === 0) {
      return response.status(403).json({ error: 'User does not have permission to delete this culture.' });
    }

    // Sinon, continuer avec la suppression de la culture
    await dataMapper.deleteCulture(Number(cultureId));
    return response.status(200).json(
      { status: 200, message: `Culture with id: ${cultureId} successfully deleted.` },
    );
  },

};

module.exports = userController;
