require('dotenv').config();
const plantDataMapper = require('../plantDataMapper');

describe('plantDataMapper findAll', () => {
  it('should return an array', async () => {
    const plants = await plantDataMapper.getAllPlants();
    expect(Array.isArray(plants.rows)).toBe(true);
  });
});

describe('plantDataMapper getOnePlant', () => {
  it('should return an object when given an existing id', async () => {
    const plantId = 1;
    const plant = await plantDataMapper.getOnePlant(plantId);
    expect(typeof plant.rows[0]).toBe('object');
  });

  it('should return undefined when given a non-existing id', async () => {
    const plantId = -1; // replace with an id that doesn't exist in your database
    const plant = await plantDataMapper.getOnePlant(plantId);
    expect(plant.rows[0]).toBeUndefined();
  });
});

describe('plantDataMapper postPlant', () => {
  it('should create a new plant and return it', async () => {
    const plantObj = {
      name: 'jest',
      id_family: 3,
      id_category: 2,
    };
    const newPlant = await plantDataMapper.postPlant(plantObj);
    const returnedPlant = newPlant.rows[0];

    expect(typeof returnedPlant).toBe('object');
    expect(returnedPlant.name).toEqual(plantObj.name);
    expect(returnedPlant.specification).toEqual([]);
    expect(returnedPlant.culture_advice).toEqual([]);
  });
});
