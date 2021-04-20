import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

export const createUser = async (req, res) => {
  const user_params = req.body;
  console.log("Trying to create user.")

  // check to see if existing user
  const exsistingUser = await User.findOne({email: user_params.email})
  if (exsistingUser) {
    console.log('User already exists')
    return res.status(500).json({message: 'User already exists'});
  }

 if (user_params.username.length < 3) {
  return res.status(500).json({message: 'Username not long enough.'})
 }
 if (user_params.password.length < 5) {
  return res.status(500).json({message: 'Password not long enough.'})
 }
 if (user_params.email.length < 3) {
  return res.status(500).json({message: 'Email not long enough.'})
 }


  const newUser = new User(user_params);
   try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(user_params.password, salt)
    await newUser.save();
    console.log('User created');

    // Sign in user with jwt
    const payload = {
      user: {
        id: newUser.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
      if (err) throw err;
      console.log('Successfully logged in');
      res.status(200).json({token})
    })
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ message: error.message })
  }
}

export const getUsers = async (req, res) => {
  
  try {
    const users = await User.find()
    console.log('Got all users')
    res.status(200).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
}