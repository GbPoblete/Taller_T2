//Entrar a postgres psql -U postgres

const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'music',
    port: '5432'
});

var Buffer = require('buffer/').Buffer;

//GETS
const getArtist = async (req, res) => {
    try{
        const response_a = await pool.query('SELECT * FROM Artist');
        res.json(response_a.rows);
    } catch (error){
        console.log(error);
    }
    
};

const getArtistById = async (req, res) => {
    try{
        const response_b = await pool.query('SELECT * FROM Artist WHERE id = $1', [req.params.id]);
        res.json(response_b.rows);
    } catch (error){
        console.log(error);
    }
    
};

const getArtistAlbums = async (req, res) => {
    try {
        const response_c = await pool.query('SELECT * FROM Album WHERE artist_id = $1', [req.params.id]);
        res.json(response_c.rows);
    } catch (error){
        console.log(error);
    }
};

const getArtistTracks = async (req, res) => {
    try {
        const response_d = await pool.query('SELECT id FROM Album WHERE artist_id = $1', [req.params.id]);
        const response_e = await pool.query('SELECT * FROM Track WHERE album_id = $1',[response_d.rows[0].id]);
        res.json(response_e.rows);
    } catch (error){
        console.log(error);
    }
};

const getAlbum = async (req, res) => {
    try{
        const response_f = await pool.query('SELECT * FROM Album');
        res.json(response_f.rows);
    } catch (error){
        console.log(error);
    }
    
};

const getAlbumById = async (req, res) => {
    try{
        const response_g = await pool.query('SELECT * FROM Album WHERE id = $1', [req.params.id]);
        res.json(response_g.rows);
    } catch (error){
        console.log(error);
    }
    
};

const getAlbumTracks = async (req, res) => {
    try {
        const response_h = await pool.query('SELECT * FROM Track WHERE album_id = $1', [req.params.id]);
        res.json(response_h.rows);
    } catch (error){
        console.log(error);
    }
};

const getTrack = async (req, res) => {
    try{
        const response_i = await pool.query('SELECT * FROM Track');
        res.json(response_i.rows);
    } catch (error){
        console.log(error);
    }
    
};

const getTrackById = async (req, res) => {
    try{
        const response_j = await pool.query('SELECT * FROM Track WHERE id = $1', [req.params.id]);
        res.json(response_j.rows);
    } catch (error){
        console.log(error);
    }
    
};

//POSTS
const createArtist =  async (req, res) => {
    let {name, age } = req.body;
    // https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
    let buff = new Buffer(name);
    let encoded = buff.toString('base64');
    let encoded_corto = encoded.substring(0,22);

    var cadena1 = "hhttps://gigiappt2.herokuapp.com/artists/";
    var cadena2 = "/albums";
    var url_albums = cadena1 + encoded_corto + cadena2;

    var cadena3 = "hhttps://gigiappt2.herokuapp.com/artists/";
    var cadena4 = "/tracks";
    var url_tracks = cadena3 + encoded_corto + cadena4;

    var cadena5 = "hhttps://gigiappt2.herokuapp.com/artists/";
    var me = cadena5 + encoded_corto;

    const response_k = await pool.query('INSERT INTO Artist (id, name, age, albums, tracks, self) VALUES ($1, $2, $3, $4, $5, $6)',
                [encoded_corto, name, age, url_albums, url_tracks, me]
            );
    res.json(response_k.rows)

};

const createAlbum =  async (req, res) => {
    let {name, genre } = req.body;
    // https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/

    let buff_1 = new Buffer(name + ':' + req.params.id);
    let encoded_1 = buff_1.toString('base64');
    let encoded_corto_1 = encoded_1.substring(0,22);

    var cadena1 = "hhttps://gigiappt2.herokuapp.com/artists/";
    var url_artist = cadena1 + req.params.id;

    var cadena3 = "hhttps://gigiappt2.herokuapp.com/albums/";
    var cadena4 = "/tracks";
    var url_tracks = cadena3 + encoded_corto_1 + cadena4;

    var cadena5 = "hhttps://gigiappt2.herokuapp.com/albums/";
    var me = cadena5 + encoded_corto_1;

    const response_l = await pool.query('INSERT INTO Album (id, artist_id, name, genre, artist, tracks, self) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [encoded_corto_1, req.params.id , name, genre, url_artist, url_tracks, me]
            );
    res.json(response_l.rows)

};

const createTrack =  async (req, res) => {
    let {name, duration } = req.body;
    // https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/

    const search = await pool.query('SELECT artist_id FROM Album WHERE id = $1', [req.params.id]);
    
    let buff_1 = new Buffer(name + ':' + req.params.id);
    let encoded_1 = buff_1.toString('base64');
    let encoded_corto_1 = encoded_1.substring(0,22);

    var cadena1 = "hhttps://gigiappt2.herokuapp.com/artists/";
    var url_artist = cadena1 + search;

    var cadena3 = "hhttps://gigiappt2.herokuapp.com/albums/";
    var url_album = cadena3 + encoded_corto_1;

    var cadena5 = "hhttps://gigiappt2.herokuapp.com/tracks/";
    var me = cadena5 + encoded_corto_1;

    const response_m = await pool.query('INSERT INTO Track (id, album_id, name, duration, times_played, artist, album, self) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [encoded_corto_1, req.params.id, name, duration, 0, url_artist, url_album, me]
            );
    res.json(response_m.rows)

};

//PUTS
const playTrackById = async (req, res) => {
    try {
        const times = await pool.query('SELECT times_played FROM Track WHERE id = $1', [req.params.id]);
        const response_n = await pool.query('UPDATE Track SET times_played = $1 WHERE id = $2', [times.rows[0].times_played + 1, req.params.id]);
        res.json("canción reproducida");
    } catch (error){
        console.log(error);
    }
};

const playTracksAlbum = async (req, res) => {
    try {
        let times_1 = await pool.query('SELECT times_played FROM Track WHERE album_id = $1', [req.params.id]);
        let ids = await pool.query('SELECT id FROM Track WHERE album_id = $1', [req.params.id]);
        var response;
        for (var i = 0; i < (times_1.rows).length; i++){
            response = await pool.query('UPDATE Track SET times_played = $1 WHERE album_id = $2', [times_1.rows[i].times_played + 1, ids.rows[i].id]);
        }
        res.json("canción reproducida");
    } catch (error){
        console.log(error);
    }
};

const playArtistAlbums = async (req, res) => {
    try {
        let ids_tracks = await pool.query('SELECT id FROM Track WHERE album_id = (SELECT id FROM Album WHERE artist_id = $1)', [req.params.id]);
        let times_tracks = await pool.query('SELECT times_played FROM Track WHERE id = (SELECT id FROM Track WHERE album_id = (SELECT id FROM Album WHERE artist_id = $1))', [req.params.id]);
        var response;
        // for (var i = 0; i < (times_tracks.rows).length; i++){
        //     response = await pool.query('UPDATE Track SET times_played = $1 WHERE album_id = $2', [times_tracks.rows[i].times_played + 1, ids_tracks.rows[i].id]);
        // }
        res.json("canción reproducida");
    } catch (error){
        console.log(error);
    }
};




//DELETE
// const deleteUsers = async (req, res) => {
//     res.send('USER DELETED' + req.params.id);
//     // const response = await pool.query('DELETE FROM prueba_artist WHERE id = $1', [req.params.id]);
//     // console.log(response);
//     // res.json(`User ${id} deleted successfully`);
// };


module.exports = {
    getArtist, 
    createArtist, 
    getArtistById,
    getArtistAlbums,
    getArtistTracks,
    getAlbum,
    getAlbumById,
    getAlbumTracks,
    getTrack,
    getTrackById,
    createAlbum,
    createTrack,
    playArtistAlbums,
    playTrackById,
    playTracksAlbum
}