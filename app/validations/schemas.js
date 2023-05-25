const Joi = require('joi');

const plantBody = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  specification: Joi.array().items(Joi.string()),
  culture_advice: Joi.array().items(Joi.string()),
  id_category: Joi.number().required(),
  id_family: Joi.number().required(),
}).required();

const categoryBody = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
}).required();

const familyBody = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  id_alliance: Joi.number(),
}).required();

const allianceBody = Joi.object({
  id: Joi.number(),
  alliance: Joi.array().items(Joi.number()).required(),
}).required();

module.exports = {
  plantBody, categoryBody, familyBody, allianceBody,
};
