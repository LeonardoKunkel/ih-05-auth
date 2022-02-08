// GESTIÓN DE SESIÓN
// CONFIGURACIÓN Y EL TIEMPO DE EXPIRACIÓN DE LA SESIÓN

// 1. IMPORTACIONES
const session = require('express-session');
const MongoStore = require('connect-mongo')

// 2. FUNCIÓN DE GESTIÓN DE LA SESIÓN
const sessionManager = (app) => {
    // Verificar con el patrón de diseño proxy que si la sesión es "extraña", evitar el ruteo
    app.set('trust proxy', 1)

    // Verificar que la sesión se genere con su palabra secreta, su ticket (cookie) y su expiración
    app.use(session({
            secret: process.env.SECRET,
            resave: true,
            cookie: {
                maxAge: 8640000, // Tiempo de expiración del cookie
                httpOnly: true
            },
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI
            })
        }
    ))
}

// 3. EXPORTACIÓN
module.exports = sessionManager;
