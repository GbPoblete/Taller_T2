const {Router} = require('express');
const router = Router();

const { getArtist, createArtist, getArtistById} = require('../controllers/app.controller')

router.get('/artists', getArtist);
router.get('/artist/:id', getArtistById);
router.post('/artist', createArtist);

module.exports = router;