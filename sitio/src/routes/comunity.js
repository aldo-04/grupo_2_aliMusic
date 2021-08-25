var express = require('express');
var router = express.Router();
const {comunity} = require('../controllers/comunityController')
/* GET home page. */

router.get('/',comunity);

module.exports = router;
