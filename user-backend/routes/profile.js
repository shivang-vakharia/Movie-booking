const express = require('express');
const router = express.Router();
const db = require('../db');
const { getUserData } = require('../controllers/auth');

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await getUserData(userId);
        res.json(userData);
    } catch (err) {
        res.status(500).send({ message: 'Error retriving user profile '});
    }
})

module.exports = router;