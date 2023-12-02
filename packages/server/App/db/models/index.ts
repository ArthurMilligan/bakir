import { News, type INewsAttributes, newsJoiSchema, newsSchema } from './news';
import User, { type IUserAttributes } from './user.model';

export { News, User };

export { newsJoiSchema, newsSchema };

export type { INewsAttributes, IUserAttributes };

export default [News, User];
