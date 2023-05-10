require('dotenv').config();
const plantDataMapper = require('../plantDataMapper');

describe('plantDataMapper findAll', () => {
  it('should return an array', async () => {
    const plants = await plantDataMapper.getAllPlants();
    console.log(plants)
    expect(Array.isArray(plants.rows)).toBe(true);
  });
});
