import jwt from 'jsonwebtoken';
import getAuthToken from '../utils/getAuthToken.js';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const authenticateJWT = async (req, res, next) => {
  const token = await getAuthToken(req);
  console.log(token);
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ error: 'Failed to authenticate token.' });
      }
      req.user = user;
      console.log("** user verified");
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided.' });
  }
};

export { 
    authenticateJWT
}