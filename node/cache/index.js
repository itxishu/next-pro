const LRU = require('lru-cache');

const cache = new LRU({
  // max: 50000,
  maxAge: 1000 * 60 * 30
});
module.exports = cache;
 