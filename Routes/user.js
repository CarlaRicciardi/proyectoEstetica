const express = require('express');
const router = express.Router()
const {getAllUsersController, getUserByEmailController, getUserByIdController, updateUserPhoneController, updateUserPasswordController, deleteUserController} = require('../controller/user.js')
const {authenticate} = require('../middleware/auth.js')




//volver a poner el middleware de authenticate
router.get('/', authenticate, getAllUsersController) //ver todos
router.get('/email/:email',  getUserByEmailController)//ver 1 usuario por email
router.get('/id/:id',  getUserByIdController)//ver 1 usuario por id
router.put('/email/up-phone/:email',  updateUserPhoneController)//modificar telefono del usuario (telefono llega por body)
router.put('/email/up-pass/:email',  updateUserPasswordController)//modificar password del usuario (password llega por body)
router.delete('/email', deleteUserController) //eliminar usuario por email (el email llega por body)
//crear usuario (en ruta de auth.js)

module.exports = router;