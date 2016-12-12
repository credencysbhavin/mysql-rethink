/*
 * Authencation middleware with session
 
 * list of allowed URLs without login
 */
var jwt = require('jsonwebtoken');
var allowed = [
    '/countryAll',
    '/login'
];

/**
 *  middleware enabled or not
 * @type Boolean
 */
var enabled = true;

/**
 * the middleware function
 * @param {type} onoff : to enable momoddleware
 * @returns {Function}
 */
module.exports = function (onoff) {
    
    enabled = (onoff == 'on') ? true : false;
    return function (req, res, next) {
        
        if (enabled && allowed.indexOf(req.originalUrl) == -1) {
            // check header or url parameters or post parameters for token
            var token = req.headers['x-access-token'];
            
            // decode token
            if (typeof token !== 'undefined' && token)
            {
                // verifies secret and checks exp
                jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
                    if (err) {
                        return res.status(401).json({success: false, message: 'Failed to authenticate token.'});
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        global.requestUserId = decoded.id;
                        next();
                    }
                });
            } else {
                // if there is no token
                return res.status(401).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        } else {
            next();
        }
    }
};