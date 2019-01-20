exports.displayHome = (req, res) => {
  const username = (req.session.user) ? req.session.user.username : null;
  res.render('home', {
    pageTitle: 'TeeStore | Home',
    isLoggedIn: req.session.isLoggedIn,
    username: username,
    path: '/home'
  });
}