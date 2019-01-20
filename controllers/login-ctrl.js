const User = require('../models/user-md');

exports.goToLogin = (req, res) => {
  res.render('login', {
    pageTitle: 'TeeStore | Login',
    path: '/login'
  });
}

exports.userAuth = (req, res) => {
  const { username, password } = req.body;
  User.findOne({where: {
    username: username,
    password: password
  }}).then(user => {
    if(!user){
      res.redirect('/signup?user-invalid');
    } else {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/home?user-authenticated')
    }
  }).catch(() => {
    res.redirect('/login?user-invalid');
  });
}