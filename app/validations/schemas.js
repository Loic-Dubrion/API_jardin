const Joi = require('joi');

const plantQuery = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
  specification: Joi.array().items(Joi.string()),
  culture_advice: Joi.array().items(Joi.string()),
  id_category: Joi.number(),
  id_familly: Joi.number(),
});

const plantBody = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  specification: Joi.array().items(Joi.string()),
  culture_advice: Joi.array().items(Joi.string()),
  id_category: Joi.number().required(),
  id_familly: Joi.number().required(),
}).required();

module.exports = { plantQuery, plantBody };
