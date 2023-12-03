import { authLoginSchema } from '../../db';

const authSwagger = {
  login: {
    'x-swagger-router-controller': 'auth',
    summary: 'login',
    tags: ['auth'],
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: authLoginSchema,
        },
      },
    },
    responses: {
      200: {
        description: 'login success',
      },
      default: {
        description: 'login error',
      },
    },
  },
  logout: {
    'x-swagger-router-controller': 'auth',
    summary: 'logout',
    tags: ['auth'],
    responses: {
      200: {
        description: 'logout success',
      },
      default: {
        description: 'logout error',
      },
    },
  },
  register: {
    'x-swagger-router-controller': 'auth',
    summary: 'register',
    tags: ['auth'],
    requestBody: {
      content: {
        'application/json': {
          schema: authLoginSchema,
        },
      },
    },
    responses: {
      200: {
        description: 'register success',
      },
      default: {
        description: 'register error',
      },
    },
  },
};

export default authSwagger;
