const express = require('express')
const route = express.Router()


const blogController = require('../controller/blogController')

//show blog
route.get('/',blogController.showBlog)

//add blog
route.post('/add_blog',blogController.addBlog)

module.exports = route