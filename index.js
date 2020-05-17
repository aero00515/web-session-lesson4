const express = require('express');
const HttpStatus = require('http-status-codes');
const { nanoid } = require('nanoid');
const { response } = require('./generator');
const { APP, HTTP } = require('./constants');
const { timer } = require('./services');
const { helloRouter } = require('./router');

const app = express();

app.use(express.json());

app.use('/getHello', helloRouter);

app.post('/', async (req, res) => {
  // Get request datas
  const reqId = req.header(HTTP.HEADER.X_REQUSET_ID) || nanoid();
  const body = req.body;

  const sleepSec = Math.random() * 10;
  const sleepMilliSec = Math.round(sleepSec * 1000);
  console.log('POST Start: ', {
    reqId,
    body,
    sleepMilliSec,
  });

  // Do sleep for simulating gard work job
  await timer.sleep(sleepMilliSec);

  console.log('POST End: ', {
    reqId,
    body,
    sleepMilliSec,
  });

  // Response
  const apiResponse = response.getResponse({
    message: '// TODO: meake your own success message',
    params: {
      reqId,
      ...body,
    },
  });
  res.status(HttpStatus.CREATED).json(apiResponse);
});

app.listen(APP.PORT, () => {
  console.log(`Listen on ${APP.PORT}`);
});
