import express from 'express';
import { UserService } from './users.service';
import AuthController from './users.controller';
import validate from '../middlewares/validator';
import { CreateUserInput, loginInput } from './user.validator';

const router = express.Router();
const userService = new UserService();
const userController = new AuthController(userService);

router.post('/api/v1/register', validate(CreateUserInput), userController.signUp.bind(userController));
router.post('/api/v1/login', validate(loginInput), userController.login.bind(userController));
router.get('/api/v1/logout', userController.logout.bind(userController));

export default router;