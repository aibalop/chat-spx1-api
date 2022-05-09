const express = require('express');
const { json, urlencoded } = express;
const morgan = require('morgan');
const cors = require('cors');

const routesv1 = require('./routes');

const app = express();

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

// middlewares
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(routesv1);

module.exports = app;
