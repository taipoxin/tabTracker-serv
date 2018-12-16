const makeDebug = require('./debug');
const app = require('./app');

const debug = makeDebug('index');

function testF(x, y) {
  return x * y;
}

debug('hello from %s', 'index');
debug(`a: ${app.a}`);

module.exports = testF;
