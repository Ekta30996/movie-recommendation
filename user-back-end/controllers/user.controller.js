const userModel = require('../models/user.model');
const { sendMail } = require('./user.mail');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId

//user registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //1) Check if user exists
    const userExists = await userModel.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({
        message: 'User is already exists',
        status: 'ERROR',
      });
    }

    //2) Generate hash of user's password
    if (username === '') {
      return res.status(400).json({ message: 'Username is required field'});
    }
    if (email === '') {
      return res.status(400).json({ message: 'Email is required field'});
    }
    if (password === '') {
      return res.status(400).json({ message: 'Password is required field'});
    }
    if (password.length === 0 || password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password is minimum to 8 characters'});
    }
    const hashPassword = await bcrypt.hash(password, 10);

    //3) Create new user
    const newUser = await userModel.create({
      username: username,
      email: email,
      password: hashPassword,
      isverified: false,
      isadmin:false
    });

    //4)Send mail to user
    sendMail(username, email, newUser._id);

    //5) Generate jwt token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id , username:newUser.username},
      process.env.SECRET_KEY,
      { expiresIn: '10m' }
    );
    const admin = newUser.isadmin
    res.status(201).json({
      message: 'User register successfully!!',
      token,
      admin,
      status: 'SUCCESS',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error occurs when signup',
      err,
      status: 'ERROR',
    });
    console.log('Error occurs when signup', err);
  }
};


//user login
exports.login = async (req, res) => {
    try {
      //1) User is already exists or not
      const { email, password } = req.body;
      const userExists = await userModel.findOne({ email: email });
      if (email === '') {
        return res.status(400).json({ message: 'Email is required field'});
      }
      if (password === '') {
        return res.status(400).json({ message: 'Password is required field' });
      }
      if (!userExists) {
        return res
          .status(404)
          .json({ message: 'User is not exists please try to register first' });
      }
      if (!userExists.isverified) {
        return res.status(400).send('Please first verify your email');
      }

      //2) Compare hash of password to previous password
      const matchPassword = await bcrypt.compare(password, userExists.password);
      if (!matchPassword) {
        return res.status(401).json({
          message: 'Invalid user credentials',
          status: 'ERROR',
        });
      }
  
      //3) generate token
      const token = jwt.sign(
        { email: userExists.email, id: userExists._id ,username:userExists.username },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      const admin = userExists.isadmin
      res.status(200).json({
        message: 'User login successfully!!',
        token,
        admin,
        status: 'SUCCESS',
      });
    } catch (err) {
      res.status(500).json({
        message: 'Error occurs when user signin',
        err,
        status: 'ERROR',
      });
      console.log('Error occurs when user signin', err);
    }
  };