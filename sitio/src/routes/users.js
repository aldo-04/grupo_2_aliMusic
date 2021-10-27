var express = require('express');
var router = express.Router();
var {profile, profileEdit, login, register,proccesRegister ,fav, processLogin, logout, add, store, edit, update, destroy} = require('../controllers/userController')
const loginValidation = require('../validations/loginValidation');
const loginCheck = require("../Middleware/loginCheck");
const multer = require('multer');
const path = require('path')
const uploadUser = require('../middleware/fotoUserMulter')
const uploadProduct = require('../middleware/fotoProductMulter')


const registerValidation = require("../validations/registerValidation")


/* GET users listing. */
router.get('/profile/:id', loginCheck, profile);
router.put('/profile/:id', uploadUser.single('avatar'),profileEdit);

router.get('/login', login);
router.post('/login',loginValidation, processLogin);

router.get('/register',register);
router.post('/register',uploadUser.single('avatar'), registerValidation ,proccesRegister);

router.get('/logout', logout);

router.get('/add', loginCheck, add);
router.post('/add', uploadProduct.array('image'), loginCheck ,store);

router.get('/edit/:id', loginCheck, edit);
router.put('/edit/:id', uploadProduct.array("avatar"), loginCheck, update);

router.delete('/delete/:id', destroy);

router.get('fav', loginCheck, fav);


module.exports = router;

