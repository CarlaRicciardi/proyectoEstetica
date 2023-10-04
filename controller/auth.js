
const {signIn} = require('../services/auth.js');

const signInController = async (req, res)=>{
    const {email, password, name, phone, role} = req.body;
    const newUser = {email, password, name, phone, role};
    await signIn(newUser)
    //devolver respuesta    
}

module.exports = {signInController}