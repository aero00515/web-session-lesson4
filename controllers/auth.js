const HttpStatus = require('http-status-codes');
const { response } = require('../generator');
const { auth } = require('../services');
const { tempStorage } = require('../db/tempStorage');

const login = (req, res) => {
  const { userId, password } = req.body;
  const isValid = tempStorage[userId] && tempStorage[userId].password === password;
  if (!isValid) {
    const errorResponse = response.getResponse({
      message: 'User not exist or password incorrect',
    });
    return res.status(HttpStatus.UNAUTHORIZED).json(errorResponse);
  }
  const token = auth.invoke(userId);
  const apiResponse = response.getResponse({
    message: 'Login Success',
    params: {
      token,
    },
  });
  return res.status(HttpStatus.OK).json(apiResponse);
}

const signup = (req, res) => {
  const { userId, password } = req.body;
  const isExist = !!tempStorage[userId];
  if (isExist) {
    const errorResponse = response.getResponse({
      message: 'User already exist',
    });
    return res.status(HttpStatus.UNAUTHORIZED).json(errorResponse);
  }
  tempStorage[userId] = { password };
  const token = auth.invoke(userId);
  const apiResponse = response.getResponse({
    message: 'Signup Success',
    params: {
      token,
    },
  });
  return res.status(HttpStatus.OK).json(apiResponse);
};

module.exports = {
  signup,
  login,
};
