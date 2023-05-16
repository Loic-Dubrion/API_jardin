const client = require('../services/clientdb');

const plotDataMapper = {
  getAllPlots: (userId) => {
    const query = 'SELECT * FROM get_all_plots($1)';
    const values = [userId];
    return client.query(query, values);
  },
};


module.exports = plotDataMapper;
