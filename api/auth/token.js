const config = require('config');
const jwt = require('jsonwebtoken');
module.exports.createTokenAdmin = (email) => {
    const token = jwt.sign({
        email: email,
        isAdmin: true
    }, config.get('secret-key'), {
        expiresIn: 20 * 60
    }); //token will expire in 20 minutes..
    return token;
}
module.exports.getTokenAdmin = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.get("secret-key"), (error, result) => {
            if (error) reject(error);
            else resolve(result)
        });
    })
};