import { newsSchema } from '../../db';

const newsSwagger = {
  get: {
    'x-swagger-router-controller': 'news',
    summary: 'get news list',
    tags: ['news'],
    parameters: [],
    responses: {
      200: {
        description: 'Done',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: newsSchema,
            },
          },
        },
      },
      default: {
        description: 'Error message',
      },
    },
  },
};

export default newsSwagger;
