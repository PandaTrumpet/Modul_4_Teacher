import Joi from 'joi';
import { typeList, releaseYearRegexp } from '../constants/movies-constants.js';

export const movieAddSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  type: Joi.string().valid(...typeList),
  releaseYear: Joi.string().required().pattern(releaseYearRegexp),
});

export const movieUpdateSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
  type: Joi.string().valid(...typeList),
  releaseYear: Joi.string().pattern(releaseYearRegexp),
});
