import { News, type INewsAttributes, newsJoiSchema, newsSchema } from './news';
import {
  Auth,
  type IAuthAttributes,
  authLoginJoiSchema,
  authLoginSchema,
} from './auth';

export { News, Auth };

export { newsJoiSchema, newsSchema };
export { authLoginJoiSchema, authLoginSchema };

export type { INewsAttributes, IAuthAttributes };

export default [News, Auth];
