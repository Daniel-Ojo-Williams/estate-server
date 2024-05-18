import express from 'express';
import { type Request, type Response } from 'express-serve-static-core';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { HttpCode } from './constants';
import { logger } from './config/logger';
import AuthRoutes from './users/users.route';

export class Server {
  private readonly app = express();
  
  constructor(private readonly port: number) {}

  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }));
    this.app.use(cookieParser());

    this.app.get('/', (req: Request, res: Response) => {
        res.status(HttpCode.OK).json({ error: false, message: 'Welcome to the estate api' });
    })
    
    this.app.use(AuthRoutes);



    this.app.all('*', (req: Request, res: Response) => {
      res.status(HttpCode.NOT_FOUND).json({ error: true, message: 'You have used an Invalid endpoint or method, please check and try again' })
    })

    this.app.listen(this.port, () => {
      logger.info(`Server started on ${this.port}`);
    })
  }
}