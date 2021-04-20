const router = require("express").Router();
const { route } = require(".");
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");

//INDEX CELEBS
router.get('/', (req, res, next) =>{
  Celebrity.find()
    .then(allCelebrities => {
      res.render('celebrities/', {allCelebrities});
    })
    .catch(err => next(err))
})
//ADD
router.get('/new', (req, res, next) => {
  res.render('celebrities/new')
});
//DETAILS
router.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then(celebrity => {
    res.render('celebrities/show', {celebrity})
  })
  .catch(err=>next(err))
})
//EDIT
router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch(err=>next(err))
});
//ADD
router.post('/new', (req, res, next) => {
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(newCelebrity => {
      res.redirect(`/celebrities/${newCelebrity.id}`)
    })
    .catch(() => res.render('celebrities/new'))
})
//DELETE
router.post('/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
  .then( () => {
    res.redirect(`/celebrities`)
  })
  .catch(err=> new(err))
})
//EDIT
router.post('/:id', (req, res, next) => {
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {name, occupation, catchPhrase})
  .then( celebrity => {
    res.redirect(`/celebrities`)
  })
  .catch(err=> new(err))
})

module.exports = router;


