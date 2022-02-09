const express = require('express');
const router = express.Router()


const indexCtrl = require('./../controllers/index.controller');

const routeGuard = require('../middlewares/route-guard');

router.get('/', indexCtrl.getHome);

router.get('/profile', routeGuard.privateAreas, indexCtrl.getProfile)

module.exports = router;

