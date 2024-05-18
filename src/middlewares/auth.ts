import type { Request, Response, NextFunction } from 'express-serve-static-core';
import { HttpCode } from '../constants/index'
import jwt from 'jsonwebtoken';

export const authMid = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['token'] as string;

    if (!token) return res.status(HttpCode.BAD_REQUEST).json({ error: true, message: 'Invalid token, please login again' });

    const user = jwt.verify(token, 'secret') as { sub: string };
    res.locals.user = { id: user.sub };
    next();
  } catch (error: any) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Something went wrong', serverMessage: error.message });
  }
}