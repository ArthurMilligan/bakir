import { log } from 'console';
import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'secret_key';

const auth = (
  req: Request<any, any>,
  res: Response,
  next: NextFunction,
): any => {
  const accessToken = req?.headers?.authorization;
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
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const accessToken = jwt.sign(decoded, secretKey, {
        expiresIn: '1h',
      });

      res
        .cookie('accessToken', accessToken, {
          maxAge: 3600,
          httpOnly: true,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 86400,
        });

      next();
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }

  return res;
};

export default auth;
