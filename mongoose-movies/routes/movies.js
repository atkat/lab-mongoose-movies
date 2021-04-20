const router = require("express").Router();
const { route } = require(".");
const Movie = require("../models/Movie");
const Celebrity = require("../models/Celebrity");

//INDEX MOVIES
router.get('/', (req, res, next) =>{
  Movie.find()
    .then(allMovies => {
      console.log(allMovies);
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
    console.log(movie);
    res.render('movies/movieDetails', {movie});
  })
  .catch(err=>next(err))
})
//EDIT
router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/edit', { movie });
    })
    .catch(err => next(err))
});
//ADD
router.post('/new', (req, res, next) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create( {title, genre, plot, cast} )
    .then(newMovie => {
      console.log(`Hey new addition ${newMovie}!`);
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
    //console.log(`Sorry, you got deleted!`);
    res.redirect(`/movies`)
  })
  .catch(err=> new(err))
})

module.exports = router;

// //test
// router.post('/:id', (req, res, next) => {
//   const { name, occupation, catchPhrase } = req.body;
//   Book.findByIdAndUpdate(req.params.id, {
//     $push: { cast: {name, occupation, catchPhrase } }
//   })
//     .then(() => {
//       res.redirect(`/movieDetails/${req.params.id}`);
//     })
//     .catch(err => {
//       next(err);
//     })
// })