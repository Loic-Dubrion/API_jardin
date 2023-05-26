const Joi = require('joi');

// For plant
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

// FOR USER
const createUserBody = Joi.object({
  id: Joi.number(),
  username: Joi.string().alphanum().max(12).required(),
  email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
  id_role: Joi.number().required(),
}).required();

const updateUserBody = Joi.object({
  username: Joi.string().alphanum().max(12),
  email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
  id_role: Joi.number(),
});

module.exports = {
  plantBody, categoryBody, familyBody, allianceBody, createUserBody, updateUserBody,
};
