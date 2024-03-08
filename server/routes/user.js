const express = require('express')
const route = express.Router()

const userController = require('../controller/userController')

// user registration
route.post('/',userController.createUser)

//user login
route.post('/login',userController.login)


module.exports = route;