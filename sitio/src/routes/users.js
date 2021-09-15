var express = require('express');
var router = express.Router();
var {profile, login, register,proccesRegister ,fav, processLogin} = require('../controllers/userController')

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
router.get('/profile/:id', profile);
router.get('/login', login);
router.post('/login',processLogin ,login);
router.get('/register', register);
router.post('/register',upload.single('avatar'), registerValidation ,proccesRegister)
router.get('fav', fav)

module.exports = router;
