import { Sequelize } from 'sequelize-typescript';
import dbConfig from '../config/db.config';
import Models from './models';

export { newsJoiSchema, newsSchema } from './models';

const sequelize = new Sequelize({
  database: dbConfig.DB,
  dialect: 'postgres',
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
});

sequelize.addModels(Models);

const db: Record<string, any> = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
