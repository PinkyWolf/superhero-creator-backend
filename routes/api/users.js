const express = require('express')
const ctrl = require('../../controllers/users')
const {validationCreateUser, validationUpdateUser} = require('../../validation/userSchema')

const router = express.Router()

router.post('/signup', validationCreateUser, ctrl.register)
router.post('/login', validationUpdateUser, ctrl.login)
router.post('/logout', validationUpdateUser, ctrl.logout)


module.exports = router