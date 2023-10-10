const express = require('express');
const router = express.Router()
const {getAllUsersController, getSingleUserController, updateUserController, deleteUserController} = require('../controller/user.js')
const {authenticate} = require('../middleware/auth.js')





router.get('/', authenticate, getAllUsersController) //ver todos
router.get('/:id',authenticate, getSingleUserController)//ver 1 usuario por id
router.put('/:id', authenticate, updateUserController)//modificar usuario
router.delete('/:id',authenticate,  deleteUserController) //eliminar usuario
//crear usuario (en ruta de auth.js)

module.exports = router;