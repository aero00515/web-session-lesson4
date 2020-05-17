const { sleep } = require('./timer');

const getHello = async () => {
  const sleepMs = 10000;
  await sleep(sleepMs);
  return 'Hello After 10sec';
}

module.exports = {
  getHello,
};
