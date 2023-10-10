
const {DBUser} = require('../models/user.js')
const userDB = new DBUser;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcryptjs') 

//al momento de registrar un usuario, según sea un paciente o doctor lo guarda en la colección correspondiente
const generateToken = (user)=>{
    return jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn:'15d'
    })
   
    //cambiar la secret key
}


const signIn = async(newUser)=>{
const result = await userDB.saveNew(newUser)
return result
}

const login = async(email, reqPassword)=>{

    try {
        let user = await userDB.findByEmail({email});
        //check if user exists or not
        if(!user){
            let message =  {message: 'User nor found'}
            return message
        }
    
        //compare password
        const isPasswordMatch = await bcrypt.compare(reqPassword, user.password);
        if(!isPasswordMatch){
            let message = {status: false, message: 'Incorrect Password'}
            return message
        }
        //get authentication token
        const token = generateToken(user)
        const {password, role, ...rest} = user._doc
        const message = {status: true, message: 'Succesful Login', token, data:{...rest}, role}
        return message

    } catch (err) {
        const errorMessage = {status: false, message: 'Failed to login'}
        return errorMessage

    }
}

module.exports = {signIn, login}