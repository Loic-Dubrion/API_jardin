const dataMapper = require('../../models/plantDataMapper');
const NoRessourceFoundError = require('../../errors/NoResourceFoundError');

const plantController = {
  //! Controller for Reading

  async getAllPlants(request, response) {
    const result = await dataMapper.getAllPlants();
    response.json(result.rows);
  },

  async getCategories(request, response) {
    const result = await dataMapper.getCategories();
    response.json(result.rows);
  },

  async getFamilies(request, response) {
    const result = await dataMapper.getFamilies();
    response.json(result.rows);
  },

  async getAlliances(request, response) {
    const result = await dataMapper.getAlliances();
    response.json(result.rows);
  },

  async getAlliancesAndFamilies(request, response) {
    const result = await dataMapper.getAlliancesAndFamilies();
    response.json(result.rows);
  },

  async getOnePlant(request, response) {
    const plantId = Number(request.params.plantId);
    const result = await dataMapper.getOnePlant(plantId);
    if (result.rows.length === 0) {
      throw new NoRessourceFoundError(`Plant with ID ${plantId} not found.`);
    } else {
      response.json(result.rows);
    }
  },

  //! Controller for Creating

  async postPlant(request, response) {
    const newPlant = await dataMapper.postPlant(request.body);
    response.status(201).json(newPlant.rows[0]);
  },

  async postFamily(request, response) {
    const newFamily = await dataMapper.postFamily(request.body);
    response.status(201).json(newFamily.rows[0]);
  },

  async postCategory(request, response) {
    const newCategory = await dataMapper.postCategory(request.body);
    response.status(201).json(newCategory.rows[0]);
  },

  async postAlliance(request, response) {
    const newAlliance = await dataMapper.postAlliance(request.body);
    response.status(201).json(newAlliance.rows[0]);
  },

  //! Controller for Updating

  async updatePlant(request, response) {
    const updatedPlant = await dataMapper.updatePlant(request.body, request.params.plantId);
    response.status(200).json(updatedPlant.rows[0]);
  },

  async updateFamily(request, response) {
    const updatedFamily = await dataMapper.updateFamily(request.body, request.params.familyId);
    response.status(200).json(updatedFamily.rows[0]);
  },

  async updateCategory(request, response) {
    const updatedCategory = await dataMapper.updateCategory(request.body, request.params.categoryId);
    response.status(200).json(updatedCategory.rows[0]);
  },

  async updateAlliance(request, response) {
    const updatedAlliance = await dataMapper.updateAlliance(request.body, request.params.allianceId);
    response.status(200).json(updatedAlliance.rows[0]);
  },

  //! Controller for Delete

  async deletePlant(request, response) {
    await dataMapper.deletePlant(request.params.plantId);
    response.status(200).json({
      message: `Plant with ID ${request.params.plantId} has been successfully deleted.`,
    });
  },

  async deleteFamily(request, response) {
    await dataMapper.deleteFamily(request.params.familyId);
    response.status(200).json({
      message: `Family with ID ${request.params.familyId} has been successfully deleted.`,
    });
  },

  async deleteCategory(request, response) {
    await dataMapper.deleteCategory(request.params.categoryId);
    response.status(200).json({
      message: `Category with ID ${request.params.categoryId} has been successfully deleted.`,
    });
  },

  async deleteAlliance(request, response) {
    await dataMapper.deleteAlliance(request.params.allianceId);
    response.status(200).json({
      message: `Alliance with ID ${request.params.allianceId} has been successfully deleted.`,
    });
  },
};

module.exports = plantController;
