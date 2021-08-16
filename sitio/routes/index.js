var express = require('express');
var router = express.Router();
const {index, contact} = require('../controllers/indexcontroller')
/* GET home page. */

router.get('/',index);
router.get('/contact', contact);

module.exports = router;
