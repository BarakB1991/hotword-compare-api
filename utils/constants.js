require('dotenv').config();

const { NODE_ENV, PORT, CLIENT_URL = 'http://localhost:3000' } = process.env;

const messages = {
  notFound: 'The resource was not found',
  unauthorized: 'Authorization required',
  invalid: 'Invalid or missing data',
  forbidden: 'Request is forbidden',
  conflict: 'Resource already exists',
  badRequest: 'Missing information',
  incorrectEmailOrPassword: 'Incorrect Email or Password',
  default: 'An error occured on the server',
};

const errorCodes = { default: 500 };

module.exports = {
  NODE_ENV,
  PORT,
  errorCodes,
  messages,
  CLIENT_URL,
};

