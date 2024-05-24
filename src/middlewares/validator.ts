import { AnyZodObject, ZodError } from "zod";
import { type Request, type Response, type NextFunction } from 'express-serve-static-core';
import { HttpCode } from '../constants/index';

const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.method === 'GET') {
        const query = req.query && schema.parse(req.query);
        req.query = query;
      } else {
        const body = req.body && schema.parse(req.body);
        req.body = body;
      }
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const message = error.errors.map(error => {
            const errorMessage = error.message;
            const pathLength = error.path.length;
            const errorField = error.path[pathLength - 1];
            return { [errorField]: errorMessage }
          })
          return res.status(HttpCode.BAD_REQUEST).json({ error: true, message });
      }

      if (error instanceof Error) {
        return res.status(HttpCode.BAD_REQUEST).json({ error: true, message: error.message })
      }

      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Something went wrong', serverMessage: error.message });
    }
  }
};

export default validate;