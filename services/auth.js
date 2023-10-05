const User = require('../models/userSchema.js');
const bcrypt = require("bcryptjs")

const signIn = async(newUser)=>{
    try {
        let {email,  password, name, phone, role} = newUser     
        

        //check if user exists
        //debería responder el controller?
        let user = await User.findOne({email})
        if(user){
            const message = {message: 'user already exists'}
            return message
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
 
        let registerNew = await new User({
                name: name,
                email: email,
                password: hashPassword,
                role:role,
                phone: phone
            }).save()
            console.log(newUser)

            //responder controller
            const message = {success:true, message:'User succesfully created'}
            return message

        }   catch (err) {
                //responder controller
                const messageError = {success:false, message:'Internal server error, try again'}
                return messageError

    }
}

module.exports = {signIn}