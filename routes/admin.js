const express = require('express');

const adminControl = require('../controller/admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/auth/create-user', auth, adminControl.createUser);

module.exports = router;