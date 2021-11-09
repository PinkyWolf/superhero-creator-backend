const jwt = require('jsonwebtoken')
const { HttpCode, ErrorMessages } = require('../helpers/constants');
const Users = require('../repositories/users')
require('dotenv').config()
const UploadAvatarService = require('../services/local-upload');

const SECRET_KEY = process.env.SECRET_KEY;


const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      res.status(HttpCode.CONFLICT).json({ status: 'error', code: HttpCode.CONFLICT, message: ErrorMessages.EMAIL_ALREADY_USED })
    }
    const { email, subscription, avatar } = await Users.create(req.body)
    return res.status(HttpCode.CREATED).json({ status: 'success', code: HttpCode.CREATED, data:{email, subscription, avatar} })
  } catch (error) {
    next(error)
  } 
}

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    const isValidPassword = await user?.isValidPassword(req.body.password)
    if(!user || !isValidPassword) {  
      res.status(HttpCode.UNAUTHORIZED).json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: ErrorMessages.INVALID_CREDENTIALS })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' })
    await Users.updatetoken(id, token)
    return res.json({ status: 'success', code: HttpCode.OK, data: {token}})
  } catch (error) {
    next(error)
  } 
}

const logout = async (req, res, next) => {
  const id = req.user.id
  try {
    await Users.updatetoken(id, null)
    res.status(HttpCode.NO_CONTENT).json({ message: ErrorMessages.no})
  } catch (error) {
    next(error)
  } 
}

const currentUser = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await Users.findById(id);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const createAvatar = async (req, res, next) => {
  try {
    const id = req.body.id;
    const USERS_AVATARS = process.env.USERS_AVATARS
    const uploads = new UploadAvatarService(USERS_AVATARS)
    const avatarUrl = await uploads.saveAvatar({ userId: id, file: req.file })
    await Users.updateAvatar(id, avatarUrl)
    res.json({status: 'success', code: HttpCode.OK, data: { avatarUrl }})
  } catch (error) {
    next(error)
  }
}

module.exports = {
    register,
    login,
    logout,
    currentUser,
    createAvatar
}