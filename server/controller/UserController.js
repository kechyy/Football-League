import bcrypt, { compareSync } from 'bcrypt';
import User from '../db/models/users';
import { tokenGenerator } from '../middlewares/authorize';

const mongoose = require('mongoose');

class UserController {
  static async SignUp(req, res) {
    const {
      firstname, lastname, email, phone, password,
    } = req.body;

    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(409).json({ status: 409, message: 'User email already exist' });
      }
      const newUser = await new User({
        _id: new mongoose.Types.ObjectId(),
        firstname,
        lastname,
        email,
        phone,
        password: bcrypt.hashSync(password, 10),
        isAdmin: false,
      }).save();
      const token = tokenGenerator({
        id: newUser.id,
        firstname: newUser.firstname,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
      return res.status(201).json({
        status: 201,
        data: {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          phone: newUser.phone,
          token,
        },
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static async SignIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      const confirmPassword = user ? compareSync(password, user.password) : '';
      if (confirmPassword) {
        const token = tokenGenerator({
          id: user.id,
          firstname: user.firstname,
          email: user.email,
          isAdmin: user.isAdmin,
        });
        return res.status(200).json({ status: 200, data: token });
      }
      return res.status(400).json({ status: 400, message: 'Invalid user email or password' });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}
const { SignUp, SignIn } = UserController;
export { SignUp, SignIn };
