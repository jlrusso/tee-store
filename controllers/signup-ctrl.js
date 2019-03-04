const User = require('../models/user-md');

exports.createUser = (req, res) => {
  const { username, email, password } = req.body;
  User.checkExisting({username, email}).then(user => {
    if(user){
      res.redirect('/login?user-exists');
    } else {
      const user = new User(username, email, password);
      return user.create();
    }
  }).then(user => {
    req.session.user = user;
    req.session.isLoggedIn = true;
    res.redirect('/home?authenticated');
  }).catch(err => {
    res.redirect('/home?auth-failed');
  });
}

exports.goToSignup = (req, res) => {
  res.render('signup', {
    pageTitle: 'TeeStore | Signup',
    path: '/signup'
  });
}