const express = require('express');
const logInCtrl = require('../controller/signin');

const router = express.Router();

router.post('/auth/signin', logInCtrl.signIn);


module.exports = router;