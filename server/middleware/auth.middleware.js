const jwt = require('jsonwebtoken'); 
// const config = require('config');
const dotenv = require('dotenv');
dotenv.config();


module.exports = (req, res, next) => { //next is method allows contining request
     if (req.method === 'OPTIONS') { //check server access
         return next()  //and contining request if true
     }

     try {
        const token  = req.headers.authorization.split(' ')[1] //"Bearer  TOKEN"
        if( !token ) {
           return  res.status(401).json( { message: 'No authorization token'} )
        }

        
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded;
        next(); //contining request


     } catch (error) {
         res.status(401).json( { message: 'No authorization auth.middlwar'} )
     }
}

