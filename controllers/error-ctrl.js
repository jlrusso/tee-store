exports.goToError = (req, res) => {
  const username = (req.session.user) ? req.session.user.username : null;
  res.render('error', {
    pageTitle: 'TeeStore | Error',
    isLoggedIn: req.session.isLoggedIn,
    username: username,
    path: '/error'
  });
}