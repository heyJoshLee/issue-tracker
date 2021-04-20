import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

export const logIn = async (req, res) => {
  const auth_params = req.body;
  console.log(auth_params)
  try {
  // check to see if user exists
  const user = await User.findOne({email: auth_params.email})
  if (!user) {
    console.log("User doesn't exists");
    return res.status(500).json({message: "User doesn't exist"})
  }

  const passwordMatch = await bcrypt.compare(auth_params.password, user.password)

  if (!passwordMatch) {
    return res.status(400).json({message: "Invalid credentials"});
  }

    // Sign in user with jwt
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
      if (err) throw err;
      console.log("Successfully logged in");
      res.status(200).json({token});
    })
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ message: error.message })
  }
}
