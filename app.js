const express = require('express');

const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const estimatorRoutes = require('./src/routes/estimator');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes to handle requests
app.use('/api/v1/on-covid-19', estimatorRoutes);

// Error Handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
