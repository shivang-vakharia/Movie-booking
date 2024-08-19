const express = requires('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.get('/', jwtMiddleware, async (req, res) => {
    const userId = req.query.userId;    //extracts userId from the query parameter (userId) sent in the request (a way of passing data from client to server)
    const query = {
        text: 'SELECT * FROM bookings WHERE user_id = $1',
        values: [userId]
    };
    try {
        const result = await db.query(query);
        res.send(result.rows);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching bookings '});
    }
});

module.exports = router;