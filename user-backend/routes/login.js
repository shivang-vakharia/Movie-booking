const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const query = {
        text: `SELECT * FROM users WHERE username = $1`,
        values: [username],
    };
    try {
        const result = await db.query(query);
        const user = result.rows[0];
        if (!user) {
            res.status(401).send({ message: 'Invalid username or password'});   // Request failed because of lack of authentication credentials
        } else {
            
            const isValid = await bcrypt.compare(password, user.password);  // takes plaintext and hashes it using the same algorithm and salt used to hash the password stored in the database. If they match then return true else return false
            if (!isValid) {
                res.status(401).send({ message: 'Invalid username or password'});
            } else {
                // -> JWT(JSON web token) is a JSON(Javascript Object Notaion) object which is used to securely transfer informatiom between two parties over the web.
                //  -> jwt.sign is used to generate a new JWT. the new JWT contains payload(" { userId: user.id} ") encrypted with the secret key, header specifies the token's type and the algorithm used for encryption, signature ensures token's authenticity and integrity
                //  -> 'your_secret_key is used to sign the token. it encrypts the payload and ensures that the token is authentic
                //  -> expiresIn specifis the time for which the token will be valid, after the time runs out a new token is requested to access protected resources 
                const token = jwt.sign({ userId: user.id }, 'your_secret_key', {expiresIn: '1h'});
                res.send ({ token });
            }
        }
    } catch (err) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

module.exports = router;