import { Router } from 'express';
import NewsRoutes from './NewsRouter';
import AuthRoutes from './AuthRouter';

const router: Router = Router();

NewsRoutes(router);
AuthRoutes(router);

export default router;

export { swNewsRoute } from './NewsRouter';
export { swAuthRoute } from './AuthRouter';
