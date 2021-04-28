const {Router} = require('express');
const router = Router();

const { getArtist, createArtist, getArtistById, getArtistAlbums, 
        getArtistTracks, getAlbum, getAlbumById, getTrack, getTrackById, 
        getAlbumTracks, createAlbum, createTrack, playArtistAlbums, playTrackById} = require('../controllers/app.controller')

//RUTAS GET 
router.get('/artists', getArtist);
router.get('/artists/:id', getArtistById);
router.get('/artists/:id/albums', getArtistAlbums);
router.get('/artists/:id/tracks', getArtistTracks);
router.get('/albums', getAlbum);
router.get('/albums/:id', getAlbumById);
router.get('/albums/:id/tracks', getAlbumTracks);
router.get('/tracks', getTrack);
router.get('/tracks/:id', getTrackById);

//RUTAS POST
router.post('/artists', createArtist);
router.post('/artists/:id/albums', createAlbum);
router.post('/albums/:id/tracks', createTrack);

//RUTAS PUT
// router.put('/artists/:id/albums/play', playArtistAlbums);
router.put('/tracks/:id/play', playTrackById)

//RUTAS DELETE

module.exports = router;