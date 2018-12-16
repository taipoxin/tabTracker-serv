/**
 * module that configure debug module dinamically
 * using .env file reading
 */

const dotenv = require('dotenv');
const makeDebug = require('debug');

dotenv.load();

if (process.env.DEBUG === '*') {
  // set debug enabled for whole project
  makeDebug.enable('*');
}

module.exports = makeDebug;
