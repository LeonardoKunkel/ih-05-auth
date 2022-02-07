const express = require('express');
const router = express.Router()


const indexCtrl = require('./../controllers/index.controller');

router.get('/', indexCtrl.getHome);

router.get('/profile', indexCtrl.getProfile)

module.exports = router;

