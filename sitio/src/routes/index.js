var express = require('express');
var router = express.Router();
const {index, about} = require('../controllers/indexController')
/* GET home page. */

router.get('/',index);
router.get('/about', about);
router.get('/search',search)

module.exports = router;
