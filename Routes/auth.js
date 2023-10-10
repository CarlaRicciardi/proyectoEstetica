const express = require('express');
const router = express.Router()

const {signInController, loginController} = require('../controller/auth.js')


router.post('/signin', signInController) 
router.post('/login', loginController)

module.exports = router;
