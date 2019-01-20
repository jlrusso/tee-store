const User = require('../models/user-md');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.goToSignup = (req, res) => {
  res.render('signup', {
    pageTitle: 'TeeStore | Signup',
    path: '/signup'
  });
}

exports.userAuth = (req, res) => {
  User.findOne({where: {
    [Op.or]: [{username: req.body.username}, {email: req.body.email}]
  }}).then(user => {
    if(!user){
      createNewUser(req, res);
    } else {
      res.redirect('/login');
    }
  }).catch(() => {
    createNewUser(req, res);
  });
}

const createNewUser = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(user => {
    req.session.user = user;
    req.session.isLoggedIn = true;
    return user.createCart();
  }).then(user => {
    res.redirect('/home?authenticated');
  }).catch(err => {
    console.log(err);
    res.redirect('/error');
  });
}