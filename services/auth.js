const User = require('../models/userSchema.js');
const bcrypt = require("bcryptjs")

const signIn = async(newUser)=>{
    try {
        let {email} = newUser     

        //check if user exists
        //debería responder el controller?
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: 'user already exists'})
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

 
        let registerNew = await new User({
                name: newUser.name,
                email: newUser.email,
                password: hashPassword,
                role: newUser.role,
                phone: newUser.phone
            }).save()

            //responder controller
            return res.status(200).json({success:true, message:'User succesfully created'});

        }   catch (err) {
                //responder controller
                return res.status(500).json({success:false, message:'Internal server error, try again'});

    }
}

module.exports = {signIn}