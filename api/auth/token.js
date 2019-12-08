const config = require('config');
const jwt = require('jsonwebtoken');
module.exports.getToken = async (email,isAdmin)=>{
    const token = jwt.sign({
        email: email,
        isAdmin:isAdmin
        }, config.get('secret-key'));
    return token;
}