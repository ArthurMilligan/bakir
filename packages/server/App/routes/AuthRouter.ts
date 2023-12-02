import { Router } from 'express';
import { auth } from '../middlewares';
import { AuthAPI } from '../controllers';

const AuthRoutes = (router: Router): void => {
  const AuthRoutes: Router = Router();

  AuthRoutes.get('/', (req, res) => {
    res.send('Welcome to auth');
  });
  AuthRoutes.post('/login', AuthAPI.login);
  AuthRoutes.get('/logout', auth, AuthAPI.logout);

  router.use('/auth', AuthRoutes);
};

export default AuthRoutes;
