const {DBStaff} = require('../models/staff.js')
const staffDB = new DBStaff;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcryptjs');
const logger = require('../config/logger.js')

const generateToken = (staff)=>{
    return jwt.sign({id:staff._id, role: staff.role}, process.env.JWT_SECRET_KEY, {
        expiresIn:'15d'
    })
}

const signInStaff = async(newStaff)=>{
    try {
        const result = await staffDB.saveNew(newStaff)
        return result
    } catch (error) {
        logger.log("error", error)
    }
}

const findStaffByEmail = async({email})=>{
    const staff = staffDB.findByEmail({email})
    return staff
}

const loginStaff = async(email, reqPassword)=>{
    try {
        
        let staff = await findStaffByEmail({email})
        console.log(staff)
        const isPasswordMatch = await bcrypt.compare(reqPassword, staff.password);
        console.log(staff)
        if(!isPasswordMatch){
            console.log("no coincidió la contraseña")
            return false
        }
        //coincide
        //get authentication token
        const token = generateToken(staff)
        console.log("token", token)
        const {password, role, ...rest} = staff._doc
        //resvisar lo que devuelve
        const message = {status: true, message: 'Succesful Login', token, data:{...rest}, role}
        return message

    } catch (err) {
        const errorMessage = {status: false, message: 'Failed to login'}
        return errorMessage

    }
}

const getAllStaff = async ()=>{
    try{
    const all = await staffDB.getAll();
    return all
    } catch(err){
        logger.log('error', err)
    }
}

const findStaffByService = async (service)=>{
    try{
        const staff = await staffDB.listByService(service)
        return staff
    }
    catch(err){
        
    }
}

const getStaffByEmail = async({email})=>{
    try{
        const staff = await staffDB.findByEmail({email});
        return staff;
    }
    catch(err){
        logger.log('error', err)
    }
    


}

const getStaffById = async(id)=>{
    try{
        const staff = await staffDB.findById(id);
        return staff;
    }
    catch(err){
        logger.log('error', err)
    }
    


}



module.exports = {signInStaff, findStaffByEmail, loginStaff, getAllStaff, findStaffByService, getStaffByEmail, getStaffById}