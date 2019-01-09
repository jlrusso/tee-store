exports.displayHome = (req, res) => {
  res.render('home', {
    pageTitle: 'TeeStore | Home',
    path: '/home'
  });
}