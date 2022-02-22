var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next) => {
  res.render('coches/list')
});

router.get('/add', async(req, res, next) => {
  res.render('coches/add')
});

router.get('/edit', async(req, res, next) => {
  res.render('coches/edit')
});

router.get('/delete', async(req, res, next) => {
  res.redirect('/coches')
});

module.exports = router;
