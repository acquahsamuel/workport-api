// @desc          Get Job listings
// @route         www.workport.com/login
// @access        Public
exports.getLogin = (req, res, next) => {
    console.log(req.session);
    res.render('auth/login', {
        path: 'login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
}



// @desc          Get Job listings
// @route         www.workport.com/login
// @access        Public
exports.postLogin = (req, res, next) => {
    req.session.isLogged = true;
    res.redirect('/');
    // res.render("auth/l")
}
