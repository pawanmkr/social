import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function authenticateUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  /* const user = getUserFromDB(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  } */
  console.log(email)  
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
  return res.status(200).json({ token });
}