const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', routes);
app.use((req, res, next) => {
  res.status(404).send({
    error: true,
    msg: 'Route not found!'
  })
});

module.exports = app;