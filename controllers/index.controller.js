
exports.getHome = (req, res) => {
    res.render('index');
}
exports.getProfile = (req, res) => {
    const username = req.session.currentUser.username || ''
    const email = req.session.currentUser.email || ''
    const msg = req.session.currentUser.msg || ''

    res.render('profile', {
        username,
        email,
        msg
    });
}