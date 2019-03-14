exports.isAuth = (req, res, next) => {
  if(!req.session.user){
    return res.redirect('/login/existing-user');
  }
  next();
};

exports.notAuth = (req, res, next) => {
  if(req.session.user){
    return res.redirect('/home');
  }
  next();
}