const path = require('path')
const express = require('express');

// set up server configuration 
const app = express(); 
const PORT = 3000; 

// set up parsing request body 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
});

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


// set up listener
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}: http://localhost:${PORT}/`);
  });

  module.export = app; 
  
