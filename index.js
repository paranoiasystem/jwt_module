var jwt = require('jsonwebtoken');

module.exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWTSECRET, (err, decode) => {
            if(err) reject(err);
            resolve(decode);
        });
    });
};

module.exports.generateUserToken = (userData) => {
    return new Promise((resolve, reject) => {
        var payload = {
            userId: userData._id,
            role: userData.role
        };
        jwt.sign(payload, process.env.JWTSECRET, { algorithm: 'HS512', expiresIn: '1h', subject: userData.email }, (err, token) => {
            if(err) reject(err);
            resolve(token);
        });
    }); 
}

module.exports.generateAppToken = (appData) => {
    return new Promise((resolve, reject) => {
        var payload = {
            role: appData.role
        };
        jwt.sign(payload, process.env.JWTSECRET, { algorithm: 'HS512', subject: appData.subject }, (err, token) => {
            if(err) reject(err);
            resolve(token);
        });
    });
}