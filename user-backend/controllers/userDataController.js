const { query } = require('express');
const db = require('../db');

// getting user by id
const getUserById = async (id) => {
    const query = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id],
    };
    try {
        const result = await db.query(query);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getUserData = async (id) => {
    const query = {
        text: `SELECT username, email, phone_number FROM users WHERE id = $1`,
        values: [id],
    };
    try {
        const result = await db.query(query);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {  getUserById, getUserData };