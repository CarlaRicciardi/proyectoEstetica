const express = require('express');
const router = express.Router()

const {signInController} = require('../controller/auth.js')


router.post('/signin', signInController) 

module.exports = router;
