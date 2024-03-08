const mongoose = require('mongoose');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//registration//
const createUser = async (req, res) => {
    const existedUser = await User.findOne({ email:req.body.email})
    if(existedUser){
        return res.status(400).json({ error: "Email already exists" })
    }else{
        try {
            const { password, confirmPassword } = req.body;
            if(password === confirmPassword) {
                const { userName, email,phone, status } = req.body;

                const newUser = new User({
                    userName,
                    email,
                    phone,
                    password,
                    status: status || 'active'
                    
                });
                
                const saveUser = await newUser.save();
                res.status(201).json(saveUser);
            }else {
                return res.status(400).json({ error: 'Passwords do not match' })
            }
        }catch(err){
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Could not create user' });
        }
    }

};



//user login//
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        if (userData.status !== 'active') {
            return res.status(400).json({ error: 'User is not active' });
        }

        const passMatch = await bcrypt.compare(password, userData.password);
        if (!passMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: userData._id }, "blogerposttoken", { expiresIn: '1h' });
        res.status(200).json({ token,userId: userData._id });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = {
    createUser,
    login
};
