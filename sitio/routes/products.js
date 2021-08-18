var express = require('express');
var router = express.Router();
const {store, search, detail, cart} = require('../controllers/productsController')
/* GET home page. */

router.get('/', store);
router.get('/', search);
router.get('/detail/:id', detail);
router.get('/cart', cart);


module.exports = router;