import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../db/services';

const secretKey = 'secret_key';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class AuthAPI {
  public static login = async (
    request: Request,
    response: Response,
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const reqBody = request.body;
      const reqLogin = reqBody?.login;
      const reqPassword = reqBody?.password;

      if (!reqLogin || !reqPassword) {
        throw new Error('Необходимо заполнить логин и пароль');
      }
      const user = await UserService.findByLogin(reqLogin);

      if (user === null) {
        throw new Error('Пользователь не найден');
      }
      const dbPassword = user?.get()?.password;
      const id = user?.get()?.id;
      const login = user?.get()?.login;

      if (dbPassword === reqPassword) {
        const accessToken = jwt.sign({ id, login }, secretKey, {
          expiresIn: '1h',
        });
        const refreshToken = jwt.sign({ id, login }, secretKey, {
          expiresIn: '1d',
        });

        void UserService.updateToken({ id, token: refreshToken });

        response
          .cookie('accessToken', accessToken, {
            maxAge: 3600,
            httpOnly: true,
          })
          .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 86400,
          });

        return response.status(200).send('logined');
      }
      if (dbPassword !== reqPassword) {
        return response.status(400).send('Неверный пароль');
      }
    } catch (error) {
      console.info(error);

      return response.status(400).send((error as Error).message);
    }

    return response;
  };

  public static logout = async (
    request: Request,
    response: Response,
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      console.log(request?.body?.user);
      const id = request?.body?.user?.id;

      if (!id) {
        throw new Error('Пользователь не найден');
      }
      void UserService.updateToken({ id, token: '' });

      return response
        .cookie('accessToken', '', { httpOnly: true })
        .cookie('refreshToken', '', { httpOnly: true })
        .status(200)
        .send('logouted');
    } catch (error) {
      console.info(error);

      return response.status(400).send((error as Error).message);
    }
  };
}

export default AuthAPI;
