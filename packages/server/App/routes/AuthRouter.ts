import { Router } from 'express';
import { auth } from '../middlewares';
import { authController, authSwagger } from '../controllers';

export const swAuthRoute = {
  '/auth/login': {
    post: authSwagger.login,
  },
  '/auth/logout': {
    get: authSwagger.logout,
  },
  '/auth/register': {
    post: authSwagger.register,
  },
};

const AuthRoutes = (router: Router): void => {
  const AuthRoutes: Router = Router();

  AuthRoutes.get('/', (req, res) => {
    res.send('Welcome to auth');
  });
  AuthRoutes.post('/login', authController.login);
  AuthRoutes.post('/register', authController.register);
  AuthRoutes.get('/logout', auth, authController.logout);

  router.use('/auth', AuthRoutes);
};

export default AuthRoutes;
