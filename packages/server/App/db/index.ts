import { Sequelize } from 'sequelize-typescript';
import Models from './models';

export { newsJoiSchema, newsSchema } from './models';
export { authLoginJoiSchema, authLoginSchema } from './models';

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB as string,
  dialect: 'postgres',
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  host: process.env.POSTGRES_HOST as string,
  port: Number(process.env.POSTGRES_PORT),
});

sequelize.addModels(Models);

const db: Record<string, any> = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
