var express = require('express');
var router = express.Router();
const {comunity, add} = require('../controllers/comunityController')
const upload = require('../middleware/comunityMulter')
/* GET home page. */

router.get('/',comunity);
router.post('/add',upload.single('comunity') ,add)

module.exports = router;
