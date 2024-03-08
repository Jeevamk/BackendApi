const mongoose = require('mongoose');
const blogCollection = require('../model/blogModel')

const showBlog = async (req,res)=>{
    const userId = req.userId;
    const blog = await blogCollection.find({userId})
    res.json(blog)

}

module.exports = {
    showBlog
}