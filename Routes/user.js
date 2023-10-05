const express = require('express');
const router = express.Router()
const {getAllUsersController, getSingleUserController, updateUserController, deleteUserController} = require('../controller/user.js')






router.get('/', getAllUsersController) //ver todos
router.get('/:id', getSingleUserController)//ver 1 usuario por id
router.put('/:id', updateUserController)//modificar usuario
router.delete('/:id', deleteUserController) //eliminar usuario
//crear usuario (en ruta de auth.js)

module.exports = router;