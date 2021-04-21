const router = require("express").Router();
const { route } = require(".");
const Movie = require("../models/Movie");
const Celebrity = require("../models/Celebrity");

//INDEX MOVIES
router.get('/', (req, res, next) =>{
  Movie.find()
    .then(allMovies => {
      //console.log(allMovies);
      res.render('movies', {allMovies});
    })
    .catch(err => next(err))
})
//ADD
router.get('/new', (req, res, next) => {
  Celebrity.find()
  .then(celebrity => {
    res.render('movies/new', {celebrity})
  })
  .catch(err=>new(err))
});
//DETAILS
router.get('/:id', (req, res, next) => {  
  console.log(req.body);
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => { 
    res.render('movies/movieDetails', {movie});
  })
  .catch(err=>next(err))
})
//EDIT
router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      Celebrity.find()
      .then(casr => {
      res.render('movies/edit', {movie, cast});
    })
    .catch(err => next(err))
  })
})
//ADD
router.post('/new', (req, res, next) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create( {title, genre, plot, cast} )
    .then(newMovie => {
      res.redirect(`/movies/${newMovie._id}`)
    })
    .catch(() => res.render('movies/new'))
})
//EDIT
router.post('/:id/edit', (req, res, next) => {
  const {title, genre, plot, cast} = req.body;
  Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast})
  .then( movie => {
    console.log('THIS IS ME:'+movie._id);
    res.redirect(`/movies/${movie._id}`)
  })
  .catch(err=> new(err))
});
//DELETE
router.post('/:id/delete', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
  .then( () => {
    res.redirect(`/movies`)
  })
  .catch(err=> new(err))
})

module.exports = router;
