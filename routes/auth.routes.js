// Importaciones
const express = require('express');
const router = express.Router();

const authCtrl = require('./../controllers/auth.controller');
const routeGuard = require('../middlewares/route-guard');

// Router
// A1. Signup - Obtener página
router.get('/register', routeGuard.authAreas, authCtrl.register);

// A2. Signup - Enviar Formulario
router.post('/register', routeGuard.authAreas, authCtrl.registerForm);

// B1. Login - Obtener página
router.get('/login', routeGuard.authAreas, authCtrl.login);

// B2. Login - Enviar formulario
router.post('/login', routeGuard.authAreas, authCtrl.loginForm);

// C1. Signout - Cerrar Sesión
router.get('/logout', authCtrl.logout)

// Exportaciones
module.exports = router;
