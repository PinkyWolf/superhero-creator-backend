const express = require('express')
const ctrl = require('../../controllers/users')
const { validationCreateUser, validationUpdateUser } = require('../../validation/userSchema')
const guard = require('../../helpers/guard')

const router = express.Router()

router.post('/signup', validationCreateUser, ctrl.register)
router.post('/login', validationUpdateUser, ctrl.login)
router.post('/logout',guard , validationUpdateUser, ctrl.logout)
router.get('/current', guard, validationUpdateUser, ctrl.currentUser);

module.exports = router