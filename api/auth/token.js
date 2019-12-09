const config = require('config');
const jwt = require('jsonwebtoken');
module.exports.getToken = async (email,isAdmin)=>{
    const token = jwt.sign({
        email: email,
        isAdmin:isAdmin
        }, config.get('secret-key'),{ expiresIn: 20 * 60 });//token will expire in 20 minutes..
    return token;
}