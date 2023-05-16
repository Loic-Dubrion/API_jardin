require('dotenv').config();
const plotDataMapper = require('../plotDataMapper');

describe('plantDataMapper findAll', () => {
  it('should return an array', async () => {
    const plots = await plotDataMapper.getAllPlots(1);
    console.log(plots)
    expect(Array.isArray(plots.rows)).toBe(true);
  });
});
