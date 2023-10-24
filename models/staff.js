const Staff = require('./staffSchema.js');
const bcrypt = require("bcryptjs");
const logger = require('../config/logger.js')


class DBStaff {
    constructor() {
      this.model = Staff;
    }
  
    async getAll() {
      const all = await this.model.find({});
      //ver si hace falta mapear
      //ver de no traer las contraseñas
      return all;
    }
    
    //el nombre del servicio tiene que estar validado según el schema de servicios
    async listByService(service) {
      const staffByService = await this.model.find({ service: service }).exec();
      return staffByService;
    }
    
  
    async findById(id) {
      const staff = this.model.findOne({ _id: id});
      return staff;
    }

    async findByEmail({email}) {
      const staff = this.model.findOne({ email });
      return staff;
    }

    async saveNew(newStaff) {
     try {
        let {email,  password, name, phone, role, photo, service, bio} = newStaff     
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        let registerNew = await new  this.model({
                name: name,
                email: email,
                password: hashPassword,
                role:role,
                phone: phone,
                photo: photo, 
                service: service, 
                bio: bio
            }).save()
            logger.log("info", "new staff registered");
            
            return registerNew
            

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
    const deletestaff = await this.model.deleteOne({ email });
      return "deleted successfully";
   }
  
    async deleteById(id) {
      const deletestaff = await this.model.deleteOne({ _id: id });
      return "deleted successfully";
    }
  }

  module.exports = {DBStaff}