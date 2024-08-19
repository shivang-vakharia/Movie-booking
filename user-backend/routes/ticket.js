const express = require('express');
const router = express.Router();
const db = require('../db');
const { getBookingData } = require('../controllers/bookingController');

router.get('/', async (req, res) => {
    const bookingId = req.query.bookingId;
    try {
        const bookingData = await getBookingData(bookingId);
        res.send(bookingData);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error'});
    }
});