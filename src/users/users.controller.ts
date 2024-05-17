import { type Request, type Response } from "express";
import { HttpCode } from "../constants/index";
import { type UserInput } from "./user.validator";
import { IUserService } from "./users.types";

class AuthController {
  constructor(private readonly userService: IUserService) {}
  async signUp(req: Request<{}, {}, UserInput>, res: Response) {
    try {
      const { email, password, username, avatar } = req.body;
      await this.userService.addUser({ email, password, username, avatar });
      return res
        .status(HttpCode.OK)
        .json({ error: false, message: "User created successfully" });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error.message });
    }
  }
}

export default AuthController;
