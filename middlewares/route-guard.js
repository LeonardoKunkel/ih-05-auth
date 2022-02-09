
// Areas de autenticación - el usuario ya se autenticó y quiere entrar a signup y login. Por lo tanto lo redirigimos al home
exports.authAreas = (req, res, next) => {

    if (req.session.currentUser) {
        return res.redirect('/')
    }

    next()

}
exports.privateAreas = (req, res, next) => {

    if (!req.session.currentUser) {
        res.redirect('/auth/login')
        return
    }

    next()

}
