const express = require('express');
const router = express.Router()

const {signInController} = require('../controller/auth.js')


router.post('/singin', signInController) 

module.exports = router;
