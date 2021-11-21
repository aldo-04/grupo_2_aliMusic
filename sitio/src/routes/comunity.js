var express = require('express');
var router = express.Router();
const {comunity, addIframe, addMedia, addVideo, addDescription} = require('../controllers/comunityController')
const upload = require('../middleware/comunityMulter')
/* GET home page. */

router.get('/',comunity);
router.post('/',addIframe)
router.post('/addImage',upload.single('image') ,addMedia)
/* router.post('/addVideo',addVideo) */
router.post('/addDescription',addDescription)

module.exports = router;


