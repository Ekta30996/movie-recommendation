const {uploadThumb}  = require('../controllers/thumb.controller')
const route = require('express').Router()
const storage = require('../lib/multer')
const auth = require('../middleware/auth')

//upload thumbnails
route.post('/:id',auth,storage.single('thumb'),uploadThumb)

module.exports = route