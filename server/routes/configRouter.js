// Require needed modules
const express = require('express');
const configController = require('../controllers/configController.js');

// Require controllers

const router = express.Router();

router.post('/new', configController.addNew, (req, res) => {
  res.status(200).json('data added');
});

router.patch('/', configController.editFunc, (req, res) => {
  res.status(200).json('func updated');
});

router.delete('/delete', configController.deleteFunc, (req, res) => {
  res.status(200).json('func deleted');
});

module.exports = router;
