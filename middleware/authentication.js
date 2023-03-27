const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, process.env.JWT_SECRET, null);
        console.log('authenticated')
        next();
    } catch (e) {
        console.log('authentication failed')
        console.log(req.headers.authorization)
        return res.status(401).json({
            message: "Authentication failed"
        })
    }
};