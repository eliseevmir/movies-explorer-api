const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const createMovieSchemaValidation = require('../schemaValidator/createMovieSchema');
const requestParamsMovieSchemaValidation = require('../schemaValidator/requestParamsMovieSchema');

router.get('/movies', getMovies);
router.post('/movies', createMovieSchemaValidation, createMovie);
router.delete('/movies/_id', requestParamsMovieSchemaValidation, deleteMovie);

module.exports = router;
