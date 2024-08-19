const express = require('wxpress');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {   //post request to ./register endpoint, fn is async so it returns a promise
    const { username, email, password } = req.body;     // extracts the username, email, password from the req.body object. the object contains the data sent in the request body

    const hashedPassword = await bcrypt.hash(password, 10);   // hashes the entered password, takes two parameters: password and cost factor(determines how computationally expesnive the hashing process is)

    const query = {
        text: `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`, // 'text' property contains the SQL query as a string , RETURNING * returns the inserted row(in this case it returns the inserteed row into result.rows[0])
        values: [username, email, hashedPassword],  // 'values' property contains an array of values to be inserted into the query
    };
    try {
        const result = await db.query(query);   // executes the postgreSQL query using db.query
        res.status(201).send({ message: 'User created successfully' });     // sends response back to client with 201 Created (request was successfully fulfilled and resulted in one or more new resourses being created) status code and a JSON object containing success message
    } catch (err) {
        res.status(500).send({ message: 'Error creating user' });   // 500 = Internal server error
    }
});

module.exports = router;