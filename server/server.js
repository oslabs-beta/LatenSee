const path = require('path');
const express = require('express');
const initializeJobsOnce = require('./runJobs');
const dataRouter = require(path.join(__dirname, './routes/dataRouter.js'));
const configRouter = require(path.join(__dirname, './routes/configRouter.js'));
const startArchive = require('./archiveData');

// set up server configuration
const app = express();
const PORT = 3000;

// set up parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', dataRouter);
app.use('/api/config', configRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
} else {
  app.use(express.static(path.resolve(__dirname, '../src')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
  });
}

// Catch all route handler
app.use((req, res) => res.status(404).send('This page cannot be found'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Unknown middleware error',
    status: 500,
    message: { err: 'An error has occured' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

// Flag to not run if we're inside jest unit tests that we don't wnat ot influence data.csv
if (process.env.TEST_NO_INTITALIZE !== 'jest_test') {
  initializeJobsOnce();
  startArchive();
}

// set up listener
const server = app.listen(PORT, () => {
  if (process.env.TEST_NO_INTITALIZE !== 'jest_test') {
    console.log(`server listening on port ${PORT}: http://localhost:${PORT}/`);
  }
});

module.exports = app;
module.exports = server;
