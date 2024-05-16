// controllers/userController.js
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, phoneNumber, email, hobbies } = req.body;
        const user = new User({ name, phoneNumber, email, hobbies });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phoneNumber, email, hobbies } = req.body;
        const user = await User.findByIdAndUpdate(id, { name, phoneNumber, email, hobbies }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Send email with selected user data
exports.sendEmail = async (req, res) => {
    try {
        const { selectedUsers, sendAll } = req.body;
        let users = {};
        if(sendAll){
            users = await User.find({});
        }else{
            users = await User.find({ _id: { $in: selectedUsers } });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            // to: 'info@redpositive.in',
            to: 'jaiswalsadanand721@gmail.com',
            subject: 'Selected User Data',
            text: JSON.stringify(users, null, 2),
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
