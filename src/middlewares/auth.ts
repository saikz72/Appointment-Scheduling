import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authorize = async (req: any, res: Response, next: NextFunction) => {
  const authToken = req.header('auth-token');
  if (!authToken) {
    return res.status(401).send('Access denied.');
  }
  try {
    const verified: string | JwtPayload = await jwt.verify(authToken, `${process.env.TOKEN_SECRET}`);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send('InvalidToken');
  }
};

export default authorize;
