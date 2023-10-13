const {DBUser} = require('../models/user.js')
const userDB = new DBUser

const createUser = async()=>{

}

const getAllUsers = async()=>{
    const allUsers = await userDB.getAll()
    return allUsers
}

const getUserByEmail = async({email})=>{

    const user = await userDB.findByEmail({email})
    return user;
}

const getUserById = async(id)=>{
    const user = await userDB.findById(id)
    return user;
}

const updateUserPhone = async({email}, phone)=>{
    const updatedPhone = await userDB.updatePhone({email}, phone)
    return updatedPhone
}

const updateUserPassword = async({email}, password)=>{
const updatedPassword = await userDB.updatePassword({email}, password)
return updatedPassword
}

const deleteUser = async(email)=>{
    const deleted = await userDB.deleteByEmail(email)
    return deleted
}

module.exports = {createUser, getAllUsers, getUserByEmail, getUserById, updateUserPhone, updateUserPassword, deleteUser}