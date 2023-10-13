const User = require('./userSchema.js');
const bcrypt = require("bcryptjs");
const logger = require('../config/logger.js')


class DBUser {
    constructor() {
      this.model = User;
    }
  
    async getAll() {
      const all = await this.model.find({});
      //ver si hace falta mapear
      //ver de no traer las contraseñas
      return all;
    }
    /*
    async listCategory(categorySelect) {
      const categoryProductos = await this.modeloProd
        .find({ category: categorySelect })
        .exec();
      return categoryProductos;
    }
    */
  
    async findById(id) {
      const user = this.model.findOne({ _id: id});
      return user;
    }

    async findByEmail({email}) {
      const user = this.model.findOne({ email });
      return user;
    }

    async saveNew(newUser) {
     try {
        let {email,  password, name, phone, role} = newUser     
        let user = await this.model.findOne({email})
        if(user){
            const message = {message: 'user already exists'}
            return message    //debería responder el controller?
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        let registerNew = await new  this.model({
                name: name,
                email: email,
                password: hashPassword,
                role:role,
                phone: phone
            }).save()
            logger.log("info", "nuevo usuario guardado");
            //responder controller
            const message = {success:true, message:'User succesfully created', registerNew}
            return message
            

        }   catch (err) {
                //responder controller
                const messageError = {success:false, message:'Internal server error, try again'}
                return messageError
        }
    }
  
    

    async updatePhone({email}, phone){
      const updatePhone = await this.model.findOneAndUpdate(
        {email},
        {phone: phone} ,
        {
          returnOriginal: false
        }
      )
        return updatePhone.phone
    }

    async updatePassword({email}, password){
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const updatePassword = await this.model.findOneAndUpdate(
        {email},
        {password: hashPassword},
        {
          returnOriginal: false
        }
      )
        return updatePassword.password
    }

   async deleteByEmail(email){
    const deleteUser = await this.model.deleteOne({ email });
      return "deleted successfully";
   }
  
    async deleteById(id) {
      const deleteUser = await this.model.deleteOne({ _id: id });
      return "deleted successfully";
    }
  }

  module.exports = {DBUser}