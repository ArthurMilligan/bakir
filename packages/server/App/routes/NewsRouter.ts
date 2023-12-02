import { Router } from 'express';
import { newsController, newsSwagger } from '../controllers';

export const swNewsRoute = {
  '/news': {
    get: newsSwagger.get,
  },
};

const NewsRoutes = (router: Router): void => {
  const NewsRoutes: Router = Router();

  NewsRoutes.get('/', newsController.get);

  router.use('/news', NewsRoutes);
};

export default NewsRoutes;
