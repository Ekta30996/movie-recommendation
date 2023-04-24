const {register,login}  = require('../controllers/user.controller')
const { emailVerification } = require('../controllers/user.mail')
const auth = require('../middleware/auth')
const route = require('express').Router()

route.post('/signup',register)

route.get('/verify', emailVerification)

route.post('/signin',login)

module.exports = route 