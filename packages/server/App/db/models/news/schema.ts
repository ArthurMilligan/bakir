import joi from 'joi';
import j2s from 'joi-to-swagger';

// Joi
export const newsJoiSchema = joi.object().keys({
  id: joi.string(),
  title: joi.string(),
  description: joi.string(),
  content: joi.string(),
});
// end of Joi

const newsSchema = j2s(newsJoiSchema).swagger;

export default newsSchema;
