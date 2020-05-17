const promiseStorage = {};

const getRunningPromise = (id, promiseFn) => {
  console.log('getRunningPromise', {
    id,
  });
  const existPromise = promiseStorage[id];
  if (!existPromise) {
    console.log('getRunningPromise/notExist', {
      id,
    });
    promiseStorage[id] = promiseFn;
    return promiseFn;
  }
  console.log('getRunningPromise/exist', {
    id,
  });
  return existPromise;
}

module.exports = {
  getRunningPromise,
};