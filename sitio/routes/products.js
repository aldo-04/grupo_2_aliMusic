var express = require('express');
var router = express.Router();
const {store, search, detail, add, edit, update, destroy, cart} = require('../controllers/productsController')
/* GET home page. */

router.get('/', store);
router.get('/', search);
router.get('/detail:id', detail);

router.get('/add', add);
router.post('/add', add);

router.get('/edit:id', edit);

router.put('/update:id', update);

router.delete('/delete:id', destroy);

router.get('/cart', cart);


module.exports = router;