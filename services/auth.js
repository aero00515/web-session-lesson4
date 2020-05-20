const jwt = require('jsonwebtoken');
const passport = require('passport');
const {
  Strategy: JwtStrategy,
  ExtractJwt,
} = require('passport-jwt');
const { APP } = require('../constants');
const { tempStorage } = require('../db/tempStorage');

const secretKey = APP.SECRET_KEY;
const expiresIn = '1h';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
  expiresIn,
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('passport jwt strategy', { jwt_payload });
  const { userId } = jwt_payload;
  const user = tempStorage[userId];
  console.log(tempStorage);
  if (user) {
    return done(null, userId);
  }
  return done(null, false);
}));

const invoke = (userId) =>
  jwt.sign({ userId }, secretKey, {
    expiresIn,
  });

module.exports = {
  invoke
};
