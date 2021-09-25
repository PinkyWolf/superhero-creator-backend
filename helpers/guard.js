const passport = require('passport')
require('../config/passport')
const {HttpCode, ErrorMessages} = require('./constants')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        const headerAuth = req.get('Authorization')
        let token = null
        if (headerAuth) {
            token = headerAuth.split(' ')[1]
        }
        if (err || token !== user?.token) {
            res.status(HttpCode.UNAUTHORIZED).json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: ErrorMessages.INVALID_CREDENTIALS })
    }
    req.user = user
        return next()
    })(req, res, next)
} 
module.exports = guard