const router = require('express').Router();
const { getMovies } = require('../controllers/movie');

router.get('/movies', getMovies);

module.exports = router;
