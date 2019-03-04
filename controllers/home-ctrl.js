exports.displayHome = (req, res) => {
  if(req.session.user){
    res.render('home', {
      pageTitle: 'TeeStore | Home',
      username: req.session.user.username,
      isLoggedIn: req.session.isLoggedIn,
      admin: req.session.user.admin,
      path: '/home'
    });
  } else {
    res.render('home', {
      pageTitle: 'TeeStore | Home',
      path: '/home'
    });
  }
}