exports.goToError = (req, res) => {
  res.render('error', {
    pageTitle: 'TeeStore | Error'
  });
}