
const {signIn} = require('../services/auth.js');

const signInController = async (req, res)=>{
    const {email, password, name, phone, role} = req.body;
    const newUser = {email, password, name, phone, role};
    const result = await signIn(newUser)
    //devolver respuesta    
    res.json(result);
}

module.exports = {signInController}