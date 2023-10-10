const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) =>{
    //get token from headers
    const authToken = req.headers.authorization;

    
    //check token exists
    if(!authToken || !authToken.startsWith("Bearer")){
        return res.status(401).json({success:false, message:"No token, authorization denied"})
    }

    try {
        const token = authToken.split(' ')[1]


        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.id
        req.role = decoded.role
        next()
    } catch (error) {
        if(error.name =="TokenExpiredError"){
            return res.status(401).json({message:'Token is expired'})
        }
        return res.status(401).json({succes:false, message:'Invalid token'})
    }
}

module.exports = {authenticate}