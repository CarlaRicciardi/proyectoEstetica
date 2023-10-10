const {createUser, getAllUsers, getSingleUser, updateUser, deleteUser} = require('../services/user.js')

const getAllUsersController = async(req, res)=>{
const allUsers = await getAllUsers()
 res.json(allUsers)
}

const getSingleUserController = async(req, res)=>{
    
}

const updateUserController = async(req, res)=>{
    
}

const deleteUserController = async(req, res)=>{
    
}

module.exports = {getAllUsersController, getSingleUserController, updateUserController, deleteUserController}