const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');


exports.register = (req, res) => {
    res.render('auth/register');
}

exports.registerForm = async (req, res) => {

    // 1. Verificar que los datos del formulario lleguen al controller
    const { email, username, password} = req.body;

    // VALIDACIONES
    // A. verificar que no haya espacios vacios
    if ( !username || !email || !password ) {
        return res.render('auth/register', {
            errorMessage: 'Todos los campos deben llenarse.'
        });
    }

    // B. Que la contraseña sea sólida (Al menos 6 caracteres, un numero, letra minúscula  y letra mayúscula)
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

	if(!regex.test(password)){

		return res.render("auth/register", {
			errorMessage: "Tu contraseña debe incluir 6 caracteres, al menos un número, una minúscula y una mayúscula."
		})

	}

    // 2. Encriptar contraseña
    // 2a. Cuantas veces vamos a revolver la contraseña
    const salt = await bcrypt.genSalt(10);

    // 2b. Resolver la contraseña cons el "salt"
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2c. Guardar en la base de datos
    try {
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        console.log(newUser);

        res.redirect('/profile');

    } catch (error) {
        // CONFIRMAR SI EL ERROR VIENE DE BASE DE DATOS
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError) {
            res.render('auth/register', {
                errorMessage: "Por favor utiliza un correo electrónico real."
            })
        }

        return
    }

}

exports.login = (req, res) => {
    res.render('auth/login');
}
