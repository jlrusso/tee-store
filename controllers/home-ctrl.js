exports.displayHome = (req, res) => {
  if(req.session.user){
    const { user, isLoggedIn, cartNumber } = req.session;
    res.render('home', {
      pageTitle: 'TeeStore | Home',
      cartNumber: cartNumber,
      username: user.username,
      isLoggedIn: isLoggedIn,
      admin: user.admin,
      id: user.id,
      path: '/home'
    });
  } else {
    res.render('home', {
      pageTitle: 'TeeStore | Home',
      path: '/home'
    });
  }
}