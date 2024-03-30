// Require needed modules
const express = require ('express'); 
const dataController = require('../controllers/dataController.js')

// Require controllers

const router = express.Router(); 

router.get('/data', dataController.getData,dataController.getRuns, (req, res) => {
    // console.log("from response", res.locals.funcData); 
    res.status(200).json(res.locals.runs); 

})

module.exports = router; 