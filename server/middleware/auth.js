import config from 'config';
import jwt from 'jsonwebtoken';

const auth =  (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({msg: "No token. Authotization denied."});
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user
    next();

  } catch (error) {
    res.status(401).json({msg: "Invalud credentials"})
  }
}


export default auth;