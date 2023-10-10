const {DBUser} = require('../models/user.js')
const userDB = new DBUser

const createUser = async()=>{

}

const getAllUsers = async()=>{
    const allUsers = await userDB.getAll()
    return allUsers
}

const getSingleUser = async()=>{
    
}

const updateUser = async()=>{
    
}

const deleteUser = async()=>{
    
}

module.exports = {createUser, getAllUsers, getSingleUser, updateUser, deleteUser}