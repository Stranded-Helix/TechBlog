// Handles whether the user is logged in and if they user is not, redirects them to the login page
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login')
  } else {
    next()
  }
};
  
module.exports = withAuth