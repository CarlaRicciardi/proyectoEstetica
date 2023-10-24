const express = require('express');
const router = express.Router()

const {signInControllerStaff, loginControllerStaff} = require('../controller/staff.js')
const {authenticate} = require('../middleware/auth.js')



router.post('/signin', signInControllerStaff) 
router.post('/login', loginControllerStaff)
/*
//volver a poner el middleware de authenticate
router.get('/', authenticate, getAllStaffController) //ver todos
router.get('/:service', getStaffByServiceController) //ver según servicio
router.get('/email/:email',  getStaffByEmailController)//ver 1  por email
router.get('/id/:id',  getStaffByIdController)//ver 1  por id
router.put('/email/up-phone/:email',  updateStaffPhoneController)//modificar telefono(telefono llega por body)
router.put('/email/up-pass/:email',  updateStaffPasswordController)//modificar password  (password llega por body)
router.delete('/email', deleteStaffController) //eliminar por email (el email llega por body)
*/



module.exports = router;