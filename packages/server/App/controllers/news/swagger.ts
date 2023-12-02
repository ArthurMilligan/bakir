import { newsSchema } from '../../db';

const newsSwagger = {
  get: {
    summary: 'update the user info',
    tags: ['login'],
    parameters: [
      {
        name: 'key',
        in: 'header',
        schema: {
          type: 'string',
        },
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            ...newsSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Done',
      },
      default: {
        description: 'Error message',
      },
    },
  },
};

export default newsSwagger;
