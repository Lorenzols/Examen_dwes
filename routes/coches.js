var express = require('express');
var router = express.Router();

const Coches = require('../models/coches')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const coches = await Coches.find()
  res.render('coches/list', {coches})
});

router.get('/add', async(req, res, next) => {
  res.render('coches/add')
});


router.post('/add', async(req, res, next) => {
  console.log(req.body);
  const coche = await new Coches(req.body)
  await coche.save()
  res.redirect('/coches')
});

router.get('/edit/:id', async(req, res, next) => {
  
  const coche = await Coches.findById(req.params.id)
  res.render('coches/edit', {coche})
});


router.post('/edit/:id', async(req, res, next) => {
  await Coches.findByIdAndUpdate(req.params.id, req.body, {})
  res.redirect('/coches')
});

router.get('/delete/:id', async(req, res, next) => {
  console.log("id ",req.params.id)
  await Coches.findByIdAndDelete(req.params.id)
  res.redirect('/coches')
});

module.exports = router;
