// @desc          Get Job listings
// @route         www.workport.com/login
// @access        Public
exports.getLogin = (req, res, next) => {
    console.log(req.session);
    res.render('home/login', {
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


exports.postLogout = (req, res, next) => {
  req.session.destroy();
  console.log(error);
  res.redirect('/');
}