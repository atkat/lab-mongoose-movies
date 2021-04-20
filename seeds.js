const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
const Movie = require("./models/Movie");

mongoose.connect('mongodb://localhost/mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: 'Camina Drummer',
    occupation: 'independent idealist',
    catchPhrase: 'Beltalowda!'
  },
  {
    name: 'Bobbie Draper',
    occupation: 'protector of the good',
    catchPhrase: 'The hardest part of this game is figuring out who the enemy really is.'
  },
  {
    name: 'Chrisjen Avasarala',
    occupation: 'Secretary General of Earth',
    catchPhrase: "Realizing you've got shit on your fingers is the first step toward washing your hands."
  }
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`${celebrities} have been added"`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));

const movies = [
  {
    genre: 'action',
    title: 'Other worlds',
    plot: 'Trying to destroy the Protomolecule, yet again.',
    cast: []
  }
];

Movie.insertMany(movies)
  .then(movie => {
    console.log(`${movies} have been added"`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));

// (async () => {
//   for (let movie of movies) {
//     const dbCast = await Cast.create(movie.cast);
//     movie.cast = dbCast._id;
//     await Movie.create(movie);
//   }
//   mongoose.connection.close();
// })()