import { type Request, type Response } from "express";
import { HttpCode } from "../constants/index";
import { type UserInput } from "./user.validator";
import { IUserService } from "./users.types";
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/token';

class AuthController {
  constructor(private readonly userService: IUserService) {}
  async signUp(req: Request<{}, {}, UserInput>, res: Response) {
    try {
      const { email, password, username, avatar } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      await this.userService.addUser({ email, password: passwordHash, username, avatar });
      res
        .status(HttpCode.OK)
        .json({ error: false, message: "User created successfully" });
    } catch (error: unknown) {
      if (error instanceof Error)
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error.message });
    }
  }

  async login(req: Request<{}, {}, Pick<UserInput, "email" | "password">>, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findUserByEmail(email);

      if (!user) return res.status(HttpCode.NOT_FOUND).json({ error: true, message: 'Invalid credentials, please check and try again' });

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) return res.status(HttpCode.NOT_FOUND).json({ error: true, message: 'Invalid credentials, please check and try again' });

      const { password: userPassword, ...data } = user;

      const token = generateToken({ sub: user.id, email: user.email, username: user.username });
      
      return res.cookie('token', token).status(HttpCode.OK).json({ error: false, message: 'Fetched users successfully', data })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error.message });
    }
    }
  }
}

export default AuthController;
