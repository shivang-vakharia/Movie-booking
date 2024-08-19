const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Booking showtime
router.post('/', jwtMiddleware, async (req, res) => {
    const { showtimeId, userId } = req.body;
    const query = {
        text: `INSERT INTO bookings (showtime_id, user_id) VALUES ($1, $2)`,
        values: [showtimeId, userId],
    };
    try {
        const result = await db.query(query);
        res.status(201).send({ message: 'Booking created Successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error creating booking '});
    }
});

module.exports = router;