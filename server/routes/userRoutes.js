// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    sendEmail,
} = require('../controllers/userController');

// Create a new user
router.post('/users', createUser);

// Get all users
router.get('/users', getUsers);

// Update a user
router.put('/users/:id', updateUser);

// Delete a user
router.delete('/users/:id', deleteUser);

// Send email with selected user data
router.post('/users/send-email', sendEmail);

module.exports = router;
