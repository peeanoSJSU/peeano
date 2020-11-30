const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(401).json({msg: "no user logged in - no auth token -- access denied"});
        } else {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (!verified) {
                return res.status(401).json({msg: "token verification failed - access denied"});
            } else {
                req.user = verified.id;
                next();
            }
        }
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }

};

module.exports = auth;