const express = require('express');
const { json, urlencoded } = express;
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));

module.exports = app;