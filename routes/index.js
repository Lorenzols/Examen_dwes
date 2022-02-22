var express = require('express');
var router = express.Router();

const Users = require('../models/users')

/* GET home page. */
router.get('/', async(req, res, next)  => {
  res.render('index', { title: 'Express' });
});

router.get('/signup', async(req, res, next)  => {
  res.render('auth/signup');
});

router.get('/signin', async(req, res, next)  => {
  res.render('auth/signin');
});

router.get('/logout', async(req, res, next)  => {
  req.logOut
  res.redirect('/signin');
});

module.exports = router;
