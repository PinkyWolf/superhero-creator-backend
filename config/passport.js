const passport = require('passport');
require('dotenv').config()
const {ErrorMessages} = require('../helpers/constants');


const SECRET_KEY = process.env.SECRET_KEY;
const Users = require('../repositories/users')


const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
        const user = await Users.findById(payload.id)
        if (!user) {
            return done(new Error(ErrorMessages.USER_NOT_FOUND))
        }
        if (!user.token) {
            return done(null, false)
        }
        return done(null, user)
    } catch (err) {
    done(err, false);
    }
    })
);