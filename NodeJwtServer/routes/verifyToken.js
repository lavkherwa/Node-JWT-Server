const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const tokenHeader = req.header('Authorization');
    // Check if token is provided 
    if(!tokenHeader){
        return res.status(401).send('Access Denied');
    }else{
        // Bearer token, so split and take the token 
        token = tokenHeader.split(' ')[1];
    }

    // Check if token is valid
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch (err) {
        return res.status(401).send('Invalid token. Access Denied');
    }

    // Pass on the call
    next();
}

module.exports.verifyToken = verifyToken;