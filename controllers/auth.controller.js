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

exports.loginForm = async (req, res) => {
    // 1. Obtención de datos del formulario
    const { email, password } = req.body;

    // 2. Validación de usuario encontrado en base de datos
    const foundUser = await User.findOne({ email });
    if(!foundUser) {
        res.render('auth/login', {
            errorMessage: 'Email o contraseña sin coincidencia'
        });
    }

    // 3. Validación de contraseña
    const verifiedPass = await bcrypt.compareSync(password, foundUser.password);
    if (!verifiedPass) {
        res.render('auth/login', {
            errorMessage: 'Email o contraseña incorrecta'
        })
        return
    }

    // 4. Gestión de sesión: si la contraseña coincide, entonces crear recordatorio (cookie) en el navegador de que sí es el usuario
    req.session.currentUser = {
        _id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        msg: 'Este es su ticket'
    }

    // 5. Redirección al profile
    return res.redirect('/profile');
}
