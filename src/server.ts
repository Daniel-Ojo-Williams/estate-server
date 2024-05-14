import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { HttpCode } from './constants';
import { logger } from '../config/logger';

export class Server {
  private readonly app = express();
  
  constructor(private readonly port: number) {}

  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.get('/', (req: Request, res: Response) => {
        res.status(HttpCode.OK).json({ error: false, message: 'Welcome to the estate api' });
    })

    this.app.listen(this.port, () => {
      logger.info(`Server started on ${this.port}`);
    })
  }
}