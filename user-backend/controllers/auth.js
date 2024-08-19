const jwt = require('jsonwebtoken');


//for authentication of token for each request
const jwtMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = await db.getUserById(decoded.userId);
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid token'});
    }
};

module.exports = { jwtMiddleware, getUserById };