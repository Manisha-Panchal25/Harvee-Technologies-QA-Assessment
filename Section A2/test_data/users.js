require('dotenv').config();

module.exports = {
  standard: {
    username: process.env.STANDARD_USERNAME,
    password: process.env.PASSWORD
  },

  locked: {
    username: process.env.LOCKED_USERNAME,
    password: process.env.PASSWORD
  },

  invalid: {
    username: process.env.INVALID_USERNAME,
    password: process.env.PASSWORD
  }
};