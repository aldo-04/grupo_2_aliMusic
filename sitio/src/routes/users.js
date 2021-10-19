var express = require('express');
var router = express.Router();
var {profile, profileEdit, login, register,proccesRegister ,fav, processLogin, logout} = require('../controllers/userController')
const loginValidation = require('../validations/loginValidation');
const loginCheck = require("../Middleware/loginCheck");
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "./public/images/fotoUser/")
    },
     filename : (req,file,cb) => {
        cb(null, "user-" + Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({ storage })

const registerValidation = require("../validations/registerValidation")


/* GET users listing. */
router.get('/profile/:id', loginCheck, profile);
router.put('/profile/:id', profileEdit);
router.get('/login', login);
router.post('/login',loginValidation, processLogin);
router.get('/register',register);
router.post('/register',upload.single('avatar'), registerValidation ,proccesRegister);
router.get('/logout', logout);
router.get('fav', loginCheck, fav);


module.exports = router;

