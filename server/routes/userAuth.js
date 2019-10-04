import { Router } from 'express';
import { SignUp, SignIn } from '../controller/UserController';
import { signUpValidate, signInValidate } from '../middlewares/UserAuthValidation';

const userRoute = Router();

userRoute.post('/signup', signUpValidate, SignUp);
userRoute.post('/signin', signInValidate, SignIn);

export default userRoute;
