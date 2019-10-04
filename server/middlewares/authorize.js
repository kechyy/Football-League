import jwt from 'jsonwebtoken';

class tokenGeneration {
/**
 * Generates a token
*/
  static tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '24h' });
    return token;
  }

  /**
   * Verifies a token
  */
  static tokenVerifier(req, res, next) {
    // const token = req.headers.authorization.replace(/^JWT\s/, '');
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Please supply your login credential',
      });
    }

    jwt.verify(token, process.env.SECRETKEY, (err, userInfo) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid login credential',
        });
      }
      req.userInfo = userInfo;
    });
    return next();
  }
}
const { tokenGenerator, tokenVerifier } = tokenGeneration;

export { tokenGenerator, tokenVerifier };
