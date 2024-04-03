// Require needed modules
const express = require('express');
const dataController = require('../controllers/dataController.js');
const path = require('path');

// Require controllers

const router = express.Router();

router.get('/user', dataController.getData, (req, res) => {
  // console.log("from response", res.locals.funcData);
  res.status(200).json(res.locals.records);
});

router.get(
  '/data',
  dataController.getData,
  dataController.getRuns,
  (req, res) => {
    // console.log("from response", res.locals.funcData);
    res.status(200).json([res.locals.runs, res.locals.all]);
  }
);

router.get(
  '/period',
  dataController.getData,
  dataController.getPeriodData,
  (req, res) => {
    res.status(200).json(res.locals.weeklyLats);
  }
);

router.get(
  '/comps',
  dataController.getData,
  dataController.getComparison,
  (req, res) => {
    res.status(200).json(res.locals.comparison);
  }
);

// Send the raw csv file with all pings that have been recorded
router.get('/dataExport', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../storage/data.csv'));
});

module.exports = router;
