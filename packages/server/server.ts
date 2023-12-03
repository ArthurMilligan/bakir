import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import db from './App/db';
import router, { swNewsRoute, swAuthRoute } from './App/routes';
import { auth } from './App/middlewares';

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'interactiver API docs for BAKIR project',
    version: '1.0.0',
    description: 'The REST API for BAKIR project',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  paths: {
    ...swNewsRoute,
    ...swAuthRoute,
  },
};
const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
};

db.sequelize.sync().then(() => {
  console.log('Drop and re-sync db.');
});

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to bakirBack.' });
});

app.get('/protected', auth, (req, res) => {
  res.send('Welcome to the protected route');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}.`);
});
