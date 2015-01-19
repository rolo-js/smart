var projects = require('../app/api/projects.js');

// app/routes.js
module.exports = function(app, passport) {

  app.get('/*.html',isLoggedIn,function(req, res, next){
    console.log(req.path);
    return next();
  });


  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/',  isLoggedIn, function(req, res) {
    res.redirect('index.html');
    //res.render('index.hbs'); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.hbs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', function(req, res, next){
    console.log('authentication in progress');
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log('Success authenticating ' + user.local.email)
        return res.redirect('/index.html');
      });
    })(req, res, next);
  });


  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.hbs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.hbs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  app.get('/api/projects',function(req,res){
    projects(function(err){console.log(err);},
    function(data){
      res.json(data);
    }
    );
  });



};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
  }
