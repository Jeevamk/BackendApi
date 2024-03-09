const express = require('express')
const route = express.Router();
const {logauth} = require('../middleware/logAuth')


const blogController = require('../controller/blogController')

//show blog
route.get('/',logauth, blogController.showBlog)

//add blog
route.post('/add_blog', logauth, blogController.addBlog);



module.exports = route