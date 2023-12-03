import joi from 'joi';
import j2s from 'joi-to-swagger';

export const authLoginJoiSchema = joi.object().keys({
  login: joi.string(),
  password: joi.string(),
});

const authLoginSchema = j2s(authLoginJoiSchema).swagger;

export default authLoginSchema;
