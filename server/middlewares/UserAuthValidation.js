import { validateSignUp, validateSignIn } from './schema-Validation';

class UserAuthValidation {
  static async signUpValidate(req, res, next) {
    try {
      const validateUser = await validateSignUp(req.body);
      if (validateUser) {
        const {
          firstname, lastname, email, phone, password,
        } = validateUser;
        req.body.firstname = firstname;
        req.body.lastname = lastname;
        req.body.email = email;
        req.body.phone = phone;
        req.body.password = password;
      }
      next();
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  static async signInValidate(req, res, next) {
    try {
      const { email, password } = req.body;
      const validateUser = await validateSignIn({ email, password });
      if (validateUser) {
        req.body.email = validateUser.email;
        req.body.password = validateUser.password;
      }
      next();
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
}
const { signUpValidate, signInValidate } = UserAuthValidation;
export { signUpValidate, signInValidate };
