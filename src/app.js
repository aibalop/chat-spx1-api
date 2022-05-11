const express = require('express');
const { json, urlencoded } = express;
const morgan = require('morgan');
const cors = require('cors');

const routesv1 = require('./routes');

const app = express();

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(routesv1);

module.exports = app;
