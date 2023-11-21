const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const generalAcesstoken = async (payload) =>{
    const access_Token = jwt.sign({
        ...payload
    },process.env.ACCESS_TOKEN,{ expiresIn: '24h'})
    return access_Token;
}
module.exports = {generalAcesstoken}
