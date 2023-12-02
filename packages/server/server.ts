import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import db from './App/db';
import router, { swNewsRoute } from './App/routes';
import { auth } from './App/middlewares';

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Dangle',
    version: '1.0.0',
    description: 'The REST API for Dangle Panel service',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  paths: {
    ...swNewsRoute,
  },
};

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

db.sequelize.sync().then(() => {
  console.log('Drop and re-sync db.');
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));

// simple route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

app.get('/protected', auth, (req, res) => {
  res.send('Welcome to the protected route');
});

// set port, listen for requests
const PORT = 8084;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
