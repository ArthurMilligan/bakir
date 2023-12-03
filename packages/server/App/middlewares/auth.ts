import { log } from 'console';
import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'secret_key';

const auth = (
  req: Request<any, any>,
  res: Response,
  next: NextFunction,
): any => {
  const accessToken = req?.cookies?.authorization;
  const refreshToken = req?.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    if (accessToken) {
      const decoded = jwt.verify(accessToken, secretKey);

      log(decoded);
      req.body.user = decoded;
      next();
    }

    if (!accessToken) {
      throw new Error('accessToken is not valid');
    }
  } catch (error) {
    console.info(error);
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const { iat, exp, ...meta } = decoded as any;

      const accessToken = jwt.sign(meta, secretKey, {
        expiresIn: '1h',
      });

      console.log(meta);
      res
        .cookie('accessToken', accessToken, {
          maxAge: 3600,
          httpOnly: true,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 86400,
        });

      req.body.user = meta;

      next();
    } catch (error) {
      console.info(error);

      return res.status(400).send((error as Error).message);
    }
  }

  return res;
};

export default auth;
