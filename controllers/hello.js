const HttpStatus = require('http-status-codes');
const { nanoid } = require('nanoid');
const { response } = require('../generator');
const { HTTP } = require('../constants');
const { cache, hello, idempotency } = require('../services');

const getHello = async (req, res) => {
  // Get request datas
  const reqId = req.header(HTTP.HEADER.X_REQUSET_ID) || nanoid();
  const reqTag = `getHello:${reqId}`;
  const reqLabel = `${reqTag}:${nanoid(8)}`

  console.time(reqLabel);
  console.log('getHello Start: ', {
    reqId,
    reqTag,
    reqLabel,
  });

  // Get 10sec hello
  const helloResult = await cache.getValueOrSet(
    reqTag,
    hello.getHello,
  );

  console.log('getHello End: ', {
    reqId,
    reqTag,
    reqLabel,
  });
  console.timeEnd(reqLabel);

  res.status(HttpStatus.OK).json(
    response.getResponse({
      message: helloResult,
    }),
  );
}

const getHelloAdv = async (req, res) => {
  // Get request datas
  const reqId = req.header(HTTP.HEADER.X_REQUSET_ID) || nanoid();
  const { id } = req.params;
  const reqTag = `getHelloAdv:${reqId}`;
  const idTag = `getHelloAdv:${id}`;

  console.time(reqTag);
  console.log('getHelloAdv Start: ', {
    reqId,
    reqTag,
  });

  // Get 10sec hello
  let helloResult = cache.getValue(reqTag);
  if (!helloResult) {
    const helloPromise = await idempotency.getRunningPromise(idTag, hello.getHello());
    helloResult = await helloPromise;
  }

  console.log('getHelloAdv End: ', {
    reqId,
    reqTag,
  });
  console.timeEnd(reqTag);

  res.status(HttpStatus.OK).json(
    response.getResponse({
      message: helloResult,
    }),
  );
}

module.exports = {
  getHello,
  getHelloAdv,
};