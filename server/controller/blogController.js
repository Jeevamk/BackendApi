const mongoose = require('mongoose');
const blogCollection = require('../model/blogModel')


const showBlog = async (req, res) => {
    const userId = req.userId;
    try {
        const blogs = await blogCollection.find({ userId });
        if (!blogs) {
            return res.status(404).json({ message: 'No blogs found for the user' });
        }
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const addBlog = async (req, res) => {
    try {
        const userId = req.userId; 
        const { title, discription , createdDate } = req.body;
        
        const newBlog = new blogCollection({
            userId,
            title,
            discription,
            createdDate
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);

    } catch (err) {
        console.error('Error adding blog:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}







module.exports = {
    showBlog,
    addBlog
}