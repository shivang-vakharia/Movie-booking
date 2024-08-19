const { query } = require('express');
const db = require('../db');

const getBookingData = async (bookingId) => {
    const query = {
        text: `SELECT b.*, u.username, u.email, u.showtime, m.title, c.name AS cinema_name
        FROM bookings b
        JOIN users u ON b.user_id = u.user_id
        JOIN showtimes s ON b.showtime_id = s.showtime_id
        JOIN movies m ON s.movie_id = m.movie_id
        JOIN cinemas c ON s.cinema_id = c.cinema_id
        WHERE b.booking_id = $1`,
        values: [bookingId],
    }
    try {
        const result = await db.query(query);
        if (!result.rows[0]) {
            res.status(404).send({ message: 'Booking not found'})
        }
        return result.rows[0];
    } catch (err) {
        res.status(500).send({ message: 'Failed to retrieve booking data' });
    }
}

module.exports = { getBookingData };