var express = require('express');
var router = express.Router();
const {store, search, detail, cart, info} = require('../controllers/productsController')
const loginCheck = require("../Middleware/loginCheck");
/* GET home page. */

router.get('/', store);
router.get('/', search);
router.get('/detail/:id', detail);
router.get('/cart', loginCheck, cart);
router.get('/infoUser', loginCheck, info);


module.exports = router;