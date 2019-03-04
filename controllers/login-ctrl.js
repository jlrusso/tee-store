const User = require('../models/user-md');

exports.goToLogin = (req, res) => {
  const username = req.session.user ? req.session.user.username : null;
  res.render('login', {
    pageTitle: 'TeeStore | Login',
    username: username,
    path: '/login'
  });
}

exports.authenticate = (req, res) => {
  const { username, password } = req.body;
  User.fetch({username, password})
  .then(user => {
    if(!user){
      res.redirect('/signup?user-dne');
    } else {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/home?authenticated');
    }
  }).catch(err => {
    res.redirect('/home?not-authenticated');
  });
}