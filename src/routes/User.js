// src/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, fetchUserProfile } = require('../controllers/userContollers');
const jwt = require('jsonwebtoken');

const router = express.Router();
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.post('/api/forgotPassword', forgotPassword);
router.patch('/api/resetPassword/:token', resetPassword);
router.get('/api/userProfile/:userId',authenticateJWT, fetchUserProfile);


module.exports = router;
