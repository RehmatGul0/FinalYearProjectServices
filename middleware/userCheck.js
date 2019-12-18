const getToken = require("../api/auth/token").getTokenUser;
const createToken = require("../api/auth/token").createTokenUser;

module.exports.checkUser = async (req, res, next)=> {
  const token = req.cookies['token'];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send({"result":"Access denied. No token provided."});
  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = await getToken(token);
    req.user = decoded.email;
    req.cookies['token'] = createToken(decoded.email);//with every successfull response new cookie will be provided..
    next();
  } catch (error) {
    //if invalid token
    res.clearCookie('token').status(400).send({"result":error});
  }
};