//Entrar a postgres psql -U postgres
require('dotenv').config();
console.log("using_enviroment", process.env.NODE_ENV);
const { Pool } = require('pg');

    // const pool = new Pool({
    //     host: 'localhost',
    //     user: 'postgres',
    //     password: '',
    //     database: 'music',
    //     port: '5432'
    // });

    const pool = new Pool({
        host: 'ec2-54-224-120-186.compute-1.amazonaws.com',
        user: 'hskbsdwjplqvre',
        password: '0202bf7e5229a84aabdcaabe4f94d5018ad2376bf3ed125bb0024f0b3069bd73',
        database: 'dcbao6daqhgc2p',
        port: '5432',
        ssl: {
            rejectUnauthorized: false,
        }
    });


var Buffer = require('buffer/').Buffer;

//GETS
const getArtist = async (req, res) => {
    try{
        const response_a = await pool.query('SELECT * FROM Artist');
        console.log(response_a.rows)
        res.status(200).send(response_a.rows);
    } catch (error){
        res.send(error);
    }
};

const getArtistById = async (req, res) => {
    try{
        const response_b = await pool.query('SELECT * FROM Artist WHERE id = $1', [req.params.id]);
        console.log(response_b);
        res.status(200).send(response_b.rows[0]);
    } catch (error){
        res.status(404).send();
    }
    
};

const getArtistAlbums = async (req, res) => {
    try {
        const response_c = await pool.query('SELECT * FROM Album WHERE artist_id = $1', [req.params.id]);
        res.status(200).send(response_c.rows);
    } catch (error){
        res.status(404).send();
    }
};

const getArtistTracks = async (req, res) => {
    try {
        const response_d = await pool.query('SELECT id FROM Album WHERE artist_id = $1', [req.params.id]);
        const response_e = await pool.query('SELECT * FROM Track WHERE album_id = $1',[response_d.rows[0].id]);
        res.status(200).send(response_e.rows);
    } catch (error){
        res.status(404).send();
    }
};

const getAlbum = async (req, res) => {
    try{
        const response_f = await pool.query('SELECT * FROM Album');
        res.status(200).send(response_f.rows);
    } catch (error){
        res.send(error);
    }
    
};

const getAlbumById = async (req, res) => {
    try{
        const response_g = await pool.query('SELECT * FROM Album WHERE id = $1', [req.params.id]);
        res.status(200).send(response_g.rows);
    } catch (error){
        res.status(404).send();
    }
    
};

const getAlbumTracks = async (req, res) => {
    try {
        const response_h = await pool.query('SELECT * FROM Track WHERE album_id = $1', [req.params.id]);
        res.status(200).send(response_h.rows);
    } catch (error){
        res.status(404).send();
    }
};

const getTrack = async (req, res) => {
    try{
        const response_i = await pool.query('SELECT * FROM Track');
        res.status(200).send(response_i.rows);
    } catch (error){
        res.send(error);
    }
    
};

const getTrackById = async (req, res) => {
    try{
        const response_j = await pool.query('SELECT * FROM Track WHERE id = $1', [req.params.id]);
        res.status(200).send(response_j.rows);
    } catch (error){
        res.status(404).send();
    }
    
};

//POSTS
const createArtist =  async (req, res) => {
    try {
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
        
        const view = await pool.query('SELECT * FROM Artist where id = $1', [encoded_corto])
        res.status(201).send(view.rows[0])

    } catch(error){
        const view = await pool.query('SELECT * FROM Artist where id = $1', [encoded_corto])
        console.log(error);
        if (error.detail.includes('already exists')){
            res.status(409).send(view.rows)
        }
        else{
            res.status(400).send('input inválido')
        }
    }

};

const createAlbum =  async (req, res) => {
    try{
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
        const view_2 = await pool.query('SELECT * FROM Artist where id = $1', [encoded_corto_1])

        res.status(201).send(view_2.rows)


    } catch(error){
        console.log(error);
        if (error.detail.includes('already exists')){
            res.status(409).send(view_2.rows)
        }
        // else if (){

        // }
        else{
            res.status(400).send('input inválido')
        }

    }
};

const createTrack =  async (req, res) => {
    try{
        let {name, duration } = req.body;
        // https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/

        const search = await pool.query('SELECT artist_id FROM Album WHERE id = $1', [req.params.id]);
        
        let buff_1 = new Buffer(name + ':' + req.params.id);
        let encoded_1 = buff_1.toString('base64');
        var encoded_corto_3 = encoded_1.substring(0,22);

        var cadena1 = "hhttps://gigiappt2.herokuapp.com/artists/";
        var url_artist = cadena1 + search;

        var cadena3 = "hhttps://gigiappt2.herokuapp.com/albums/";
        var url_album = cadena3 + encoded_corto_3;

        var cadena5 = "hhttps://gigiappt2.herokuapp.com/tracks/";
        var me = cadena5 + encoded_corto_3;

        const response_m = await pool.query('INSERT INTO Track (id, album_id, name, duration, times_played, artist, album, self) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                    [encoded_corto_3, req.params.id, name, duration, 0, url_artist, url_album, me]
                );
        var view_3 = await pool.query('SELECT * FROM Track where id = $1', [encoded_corto_3])
        res.status(201).send(view_3.rows)
    } catch(error){
        var view_3 = await pool.query('SELECT * FROM Track where id = $1', [encoded_corto_3])
        if (error.detail.includes('already exists')){
            res.status(409).send()
        }
        // else if (){

        // }
        else{
            res.status(400).send('input inválido')
        }
    }
};

//PUTS
const playTrackById = async (req, res) => {
    try {
        const times = await pool.query('SELECT times_played FROM Track WHERE id = $1', [req.params.id]);
        const response_n = await pool.query('UPDATE Track SET times_played = $1 WHERE id = $2', [times.rows[0].times_played + 1, req.params.id]);
        res.status(200).send("canción reproducida");
    } catch (error){
        res.status(404).send();
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
        res.satus(200).send("canción reproducida");
    } catch (error){
        res.status(404).send();
    }
};

const playArtistAlbums = async (req, res) => {
    try {
        let ids_tracks = await pool.query('SELECT id FROM Track WHERE album_id = (SELECT id FROM Album WHERE artist_id = $1)', [req.params.id]);
        var times_tracks = [];
        var aux;
        for (var i = 0; i < (ids_tracks.rows).length; i++){
            aux = await pool.query('SELECT times_played FROM Track WHERE id = $1', [ids_tracks.rows[i].id]);
            times_tracks.push(aux.rows[0])
        }
        var response;
        for (var i = 0; i < (times_tracks).length; i++){
            response = await pool.query('UPDATE Track SET times_played = $1 WHERE id = $2', [times_tracks[i].times_played + 1, ids_tracks.rows[i].id]);
        }
        res.status(200).send("canción reproducida");
    } catch (error){
        res.status(404).send();
    }
};

//DELETE
const deleteArtist = async (req, res) => {
    try {
        let ids_albums = await pool.query('SELECT id FROM Album WHERE artist_id = $1', [req.params.id]);
        var ids_tracks = [];
        var response_1;
        var response_13;
        var aux_1;
        for (var k = 0; k < (ids_albums.rows).length; k++){
            aux_1 = await pool.query('SELECT id FROM Track WHERE album_id = $1', [ids_albums.rows[k].id]);
            for (var g= 0; g < (aux_1.rows).length; g++){
                ids_tracks.push(aux_1.rows[g])
            }
        }

        console.log(ids_albums.rows.length);

        for (var i = 0; i < (ids_tracks).length; i++){
            response_1 = await pool.query('DELETE FROM Track WHERE id = $1', [ids_tracks[i].id]);
            console.log('canción con id: $1 eliminada', [ids_tracks[i].id]);
        }

        console.log('eliminados los tracks');

        for (var y = 0; y < (ids_albums.rows).length; y++){
            response_13 = await pool.query('DELETE FROM Album WHERE id = $1', [ids_albums.rows[y].id]);
            console.log('canción con id: $1 eliminada', [ids_albums.rows[y].id]);
        }
        console.log('eliminados los albums');

        let action_3 = await pool.query('DELETE FROM Artist WHERE id = $1', [req.params.id]);

        res.status(204).send("artista eliminado");
    } catch (error){
        res.status(404).send();
    }
};

const deleteTrack = async (req, res) => {
    try {
        const response_z = await pool.query('DELETE FROM Track WHERE id = $1', [req.params.id]);
        res.status(204).send("canción eliminada");
    } catch (error){
        res.status(404).send();
    }
};

const deleteAlbum = async (req, res) => {
    try {
        let ids = await pool.query('SELECT id FROM Track WHERE album_id = $1', [req.params.id]);
        var response;
        for (var i = 0; i < (ids.rows).length; i++){
            response = await pool.query('DELETE FROM Track WHERE id = $1', [ids.rows[i].id]);
            console.log('canción con id: $1 eliminada', [ids.rows[i].id]);
        }
        console.log('eliminados los tracks')
        let action_2 = await pool.query('DELETE FROM Album WHERE id = $1', [req.params.id]);
        res.status(204).send("album eliminado");
    } catch (error){
        res.status(404).send();
    }
};

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
    playTracksAlbum,
    deleteArtist,
    deleteTrack,
    deleteAlbum
}