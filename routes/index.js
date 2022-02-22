var express = require('express');
var router = express.Router();

const passport = require('passport')
const Coches = require('../models/coches')

const {logged, Notlogged} = require('../lib/protect')

/* GET home page. */
router.get('/', async(req, res, next)  => {
  res.render('index', { title: 'Express' });
});

router.get('/signup', Notlogged, async(req, res, next)  => {
  res.render('auth/signup');
});

router.post('/signup', Notlogged, passport.authenticate('local.signup', { 
   successRedirect: '/coches', 
   failureRedirect: '/signup'
}));

router.get('/signin', Notlogged, async(req, res, next)  => {
  res.render('auth/signin');
});


router.post('/signin', Notlogged, async(req, res, next) => { 
  passport.authenticate('local.signin', { 
    successRedirect: '/coches', 
    failureRedirect: '/signin' 
  })(req, res, next) 
});


router.get('/logout', logged, async(req, res, next)  => {
  req.logOut()
  res.redirect('/signin');
});

router.get('/api', async(req, res, next)  => {
  const coches = await Coches.find()
  res.json({coches})
});


module.exports = router;
