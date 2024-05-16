const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const jwtSecret=process.env.secretToken
const dotenv=require('dotenv')
dotenv.config()
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).send('Access Denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(400).send('Invalid token.');
    }
};

module.exports = authMiddleware;