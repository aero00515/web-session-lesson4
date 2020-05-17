const NodeCache = require('node-cache');
const nodeCache = new NodeCache();

const setValue = (key, value, ttl = 0) => {
  console.log('set cache', {
    key,
    value,
    ttl,
  });
  nodeCache.set(key, value, ttl);
}

const getValue = (key) => {
  const value = nodeCache.get(key);
  console.log('get cache', {
    key,
    value,
  });
  return value;
};

const getValueOrSet = async (key, promiseFn) => {
  console.log('getValueOrSet cache', {
    key,
  });
  let value = getValue(key);
  if (!value) {
    value = await promiseFn();
    setValue(key, value);
  }
  return value;
}

module.exports = {
  setValue,
  getValue,
  getValueOrSet,
};
