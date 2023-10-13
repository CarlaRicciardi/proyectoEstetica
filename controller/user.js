const { getAllUsers, getUserByEmail, getUserById, updateUserPhone, updateUserPassword, deleteUser} = require('../services/user.js')

const getAllUsersController = async(req, res)=>{
const allUsers = await getAllUsers()
 res.json(allUsers)
}

const getUserByEmailController = async(req, res)=>{
    const {email} = req.params;
    const user = await getUserByEmail({email})
        //poner el status succes o error como el hindú
    res.json(user)
}

const getUserByIdController = async(req, res)=>{
    const {id} = req.params;
    console.log(id)
    const user = await getUserById(id)
        //poner el status succes o error como el hindú
    res.json(user)
}

const updateUserPhoneController = async(req, res)=>{
    const {phone} = req.body;
    const {email} = req.params;
    const updatedPhone = await updateUserPhone({email}, phone);
    if(!updatedPhone){
        res.status(404).json({success: false, message: "Could not update phone, try again"})
    }
    res.status(200).json({success:"true", message: `Phone updated succesfully: ${updatedPhone}`})

}

const updateUserPasswordController = async(req, res)=>{
    const {password} = req.body; //string que escribe el usuario
    const {email} = req.params;
    const updatedPassword = await updateUserPassword({email}, password);
    if(!updatedPassword){
        res.status(404).json({success: false, message: "Could not update password, try again"})
    }
    res.status(200).json({success:"true", message: `Password updated succesfully: ${updatedPassword}`})
}

const deleteUserController = async(req, res)=>{
    const {email} = req.body;
    const deleted = await deleteUser(email)
    //poner el status succes o error como el hindú
    res.json(deleted)
}

module.exports = {getAllUsersController, getUserByEmailController, getUserByIdController, updateUserPhoneController, updateUserPasswordController, deleteUserController}