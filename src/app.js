// @flow

const makeDebug = require('debug');
const mongoose = require('mongoose');
const express = require('express');
const Page = require('./models/page');

const debug = makeDebug('app');

mongoose.connect('mongodb://Kaneki:27017/tab-tracker', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  debug('connected to database');
});

// Create an express server and a GraphQL endpoint
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));


// Add headers
// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'chrome-extension://ambdjfopgamjoelakmoeancjeejhlbcf');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/new', async (req: express$Request, res: express$Response) => {
  // console.log(req.body);
  debug(req.body);
  // TODO: save data
  try {
    const data: any = req.body;
    const { user, title, datetime } = data;
    debug(
      `user: ${user};`
      + `title: ${title};`
      + `datetime: ${datetime};`,
    );
    const page = new Page({
      user,
      title,
      datetime,
    });

    res.send(await page.save());
  } catch (err) {
    const data = {
      statusCode: 400,
      error: 'Bad Request',
      message: 'Bad Request',
    };
    if (err instanceof TypeError) {
      data.message = 'Bad arguments';
      res.status(400);
      res.send(data);
      return;
    }
    // other errors
    debug(err);
    res.status(400);
    res.send(data);
  }
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

const port = 4500;


app.listen(port, () => {
  debug('Server Now Running On '
    + `localhost:${port}`);
});

module.exports = { app };
