var express = require('express');
var router = express.Router();

const Coches = require('../models/coches')
const {logged} = require('../lib/protect')

/* GET users listing. */
router.get('/', logged, async(req, res, next) => {
  const id = req.user
  const coches = await Coches.find({user_id: id})
  console.log("COCHES", coches)
  res.render('coches/list', {coches})
});

router.get('/add', logged, async(req, res, next) => {
  res.render('coches/add')
});


router.post('/add', logged, async(req, res, next) => {
  console.log(req.body);
  const id = req.user
  const {marca, potencia, url} = req.body
  const coche = await new Coches({
    marca: marca,
    potencia: potencia,
    url: url,
    user_id: id
  })
  await coche.save()
  res.redirect('/coches')
});

router.get('/edit/:id', logged, async(req, res, next) => {
  
  const coche = await Coches.findById(req.params.id)
  res.render('coches/edit', {coche})
});


router.post('/edit/:id', logged, async(req, res, next) => {
  await Coches.findByIdAndUpdate(req.params.id, req.body, {})
  res.redirect('/coches')
});

router.get('/delete/:id', logged, async(req, res, next) => {
  console.log("id ",req.params.id)
  await Coches.findByIdAndDelete(req.params.id)
  res.redirect('/coches')
});

module.exports = router;
