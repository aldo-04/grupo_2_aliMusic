var express = require('express');
var router = express.Router();
const {index, add, store, edit, update, destroy} = require('../controllers/adminController')
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "./public/images/articulos/")
    },
     filename : (req,file,cb) => {
        cb(null, "art-" + Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({ storage })

router.get('/', index)
router.get('/add', add);
router.post('/add', upload.single('image') ,store);

router.get('/edit/:id', edit);
router.put('/edit/:id', upload.single("image"), update);

router.delete('/delete/:id', destroy);

module.exports = router;