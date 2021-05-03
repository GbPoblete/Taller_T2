const {Router} = require('express');
const router = Router();

const { getArtist, createArtist, getArtistById, getArtistAlbums, 
        getArtistTracks, getAlbum, getAlbumById, getTrack, getTrackById, 
        getAlbumTracks, createAlbum, createTrack, playArtistAlbums, playTrackById, 
        playTracksAlbum, deleteArtist, deleteTrack, deleteAlbum, putArtist, 
        deleteArtist_gen, createArtistById, putArtistById, putArtistAlbums, 
        deleteArtistAlbums, createArtistTracks, putArtistTracks,
        deleteArtistTracks, genericMethod} = require('../controllers/app.controller')

//RUTAS GET 
router.get('/artists', getArtist);
router.get('/artists/:id', getArtistById);
router.get('/artists/:id/albums', getArtistAlbums);
router.get('/artists/:id/tracks', getArtistTracks);
router.get('/artists/:id/albums/play', genericMethod);
router.get('/albums', getAlbum);
router.get('/albums/:id', getAlbumById);
router.get('/albums/:id/tracks', getAlbumTracks);
router.get('/albums/:id/tracks/play', genericMethod);
router.get('/tracks', getTrack);
router.get('/tracks/:id', getTrackById);
router.get('/tracks/:id/play', genericMethod);



//RUTAS POST
router.post('/artists', createArtist);
router.post('/artists/:id', createArtistById);
router.post('/artists/:id/albums', createAlbum);
router.post('/artists/:id/tracks', createArtistTracks);
router.post('/artists/:id/albums/play', genericMethod);
router.post('/albums', genericMethod);
router.post('/albums/:id', genericMethod);
router.post('/albums/:id/tracks', createTrack);
router.post('/albums/:id/tracks/play', genericMethod);
router.post('/tracks', genericMethod);
router.post('/tracks/:id', genericMethod);
router.post('/tracks/:id/play', genericMethod);




//RUTAS PUT
router.put('/artists', putArtist);
router.put('/artists/:id', putArtistById);
router.put('/artists/:id/albums', putArtistAlbums);
router.put('/artists/:id/tracks', putArtistTracks);
router.put('/artists/:id/albums/play', playArtistAlbums);
router.put('/albums', genericMethod);
router.put('/albums/:id', genericMethod);
router.put('/albums/:id/tracks', genericMethod);
router.put('/albums/:id/tracks/play', playTracksAlbum);
router.put('/tracks', genericMethod);
router.put('/tracks/:id', genericMethod);
router.put('/tracks/:id/play', playTrackById);




//RUTAS DELETE
router.delete('/artists', deleteArtist_gen);
router.delete('/artists/:id', deleteArtist);
router.delete('/artists/:id/albums', deleteArtistAlbums);
router.delete('/artists/:id/tracks', deleteArtistTracks);
router.delete('/artists/:id/albums/play', genericMethod);
router.delete('/albums', genericMethod);
router.delete('/albums/:id', deleteAlbum);
router.delete('/albums/:id/tracks', genericMethod);
router.delete('/albums/:id/tracks/play', genericMethod);
router.delete('/tracks', genericMethod);
router.delete('/tracks/:id', deleteTrack);
router.delete('/tracks/:id/play', genericMethod);


module.exports = router;