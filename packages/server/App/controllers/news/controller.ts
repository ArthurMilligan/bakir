import type { Request, Response } from 'express';
import { NewsService } from '../../db/services';

class NewsAPI {
  public static get = async (
    _request: Request,
    response: Response,
  ): Promise<any> => {
    try {
      const news = await NewsService.getAll();

      return response.status(200).json(news);
    } catch (error) {
      console.info(error);

      return response.status(400).send(error);
    }
  };
}

export default NewsAPI;
