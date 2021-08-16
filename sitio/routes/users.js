var express = require('express');
var router = express.Router();
var {user, login, register, fav} = require('../controllers/userController')

/* GET users listing. */
router.get('/', user);
router.get('/login', login);
router.get('/register', register);
router.get('fav', fav)

module.exports = router;
