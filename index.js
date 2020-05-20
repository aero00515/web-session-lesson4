// Env Config init at every beginning
require('dotenv').config();
const express = require('express');
const HttpStatus = require('http-status-codes');
const { nanoid } = require('nanoid');
const passport = require('passport');
const { APP, HTTP } = require('./constants');
const { response } = require('./generator');
const { helloRouter, authRouter } = require('./router');
const { timer } = require('./services');

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/getHello',
  passport.authenticate('jwt', { session: false }),
  helloRouter,
);

app.use('/auth', authRouter);

app.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
