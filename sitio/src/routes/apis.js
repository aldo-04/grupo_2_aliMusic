const router = require('express').Router()
const {getMails} = require('../controllers/apisController')

/* /api */
router.get('/emails',getMails)



module.exports = router
