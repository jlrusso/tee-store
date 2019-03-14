const User = require('../models/user-md');
const Cart = require('../models/cart-md');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
  const { username, email, password } = req.body;
  User.checkExisting({username, email}).then(user => {
    if(user){
      res.redirect('/login?user-exists');
    } else {
      return bcrypt.hash(password, 12);
    }
  }).then(hashedPwd => {
    const user = new User(username, email, hashedPwd);
    return user.create();
  }).then(user => {
    const newCart = new Cart(user._id);
    newCart.create();
    req.session.user = user;
    req.session.cartNumber = 0;
    req.session.isLoggedIn = true;
    req.session.save(() => {
      res.redirect('/home?authenticated');
    });
  }).catch(err => {
    res.redirect('/home?auth-failed');
  });
}

exports.goToSignup = (req, res) => {
  res.render('signup', {
    pageTitle: 'TeeStore | Signup',
    path: '/signup/new-user'
  });
}

exports.goToLogin = (req, res) => {
  res.render('login', {
    pageTitle: 'TeeStore | Login',
    path: '/login/existing-user'
  });
}

exports.authenticate = (req, res) => {
  const { username, password } = req.body;
  let authedUser;
  User.fetch(username)
  .then(user => {
    if(!user){
      return res.redirect('/signup/new-user?user-dne');
    } else {
      authedUser = user;
      return bcrypt.compare(password, user.password);
    }
  }).then(pwdMatch => {
    if(!pwdMatch){
      return res.redirect('/login/existing-user?match-err'); 
    }
    req.session.isLoggedIn = true;
    req.session.user = authedUser;
    return Promise.resolve(authedUser._id);
  }).then(userId => {
    return Cart.fetch(userId);
  }).then(cart => {
    req.session.cartNumber = cart.products.length;
    req.session.save(() => {
      res.redirect('/home?authenticated');
    });
  }).catch(err => {
    res.redirect('/signup/new-user');
  });
}

exports.logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/home');
  });
}