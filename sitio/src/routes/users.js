var express = require('express');
var router = express.Router();
var {user, login, register,proccesRegister ,fav} = require('../controllers/userController')

const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "./src/public/images/fotoUser/")
    },
     filename : (req,file,cb) => {
        cb(null, "user-" + Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({ storage })
/* GET users listing. */
router.get('/', user);
router.get('/login', login);
router.get('/register', register);
router.post('/register',upload.single('avatar'),proccesRegister)
router.get('fav', fav)

module.exports = router;
