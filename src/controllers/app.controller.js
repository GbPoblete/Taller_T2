//Entrar a postgres psql -U postgres

const { Pool } = require('pg');

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: '',
//     database: 'music',
//     port: '5432',
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
        res.status(200).send(response_a.rows);
    } catch (error){
        res.send(error);
    }
};

const getArtistById = async (req, res) => {
    try{
        const response_b = await pool.query('SELECT * FROM Artist WHERE id = $1', [req.params.id]);
        if (response_b.rows[0].length == 0){
            res.status(404).send();
        }
        else{
            res.status(200).send(response_b.rows[0]);
        }
    } catch (error){
        res.status(404).send();
    }
    
};

const getArtistAlbums = async (req, res) => {
    try {
        const response_b = await pool.query('SELECT * FROM Artist WHERE id = $1', [req.params.id]);
        if (response_b.rows[0].length == 0){
            res.status(404).send();
        }
        else{
            const response_c = await pool.query('SELECT * FROM Album WHERE artist_id = $1', [req.params.id]);
            res.status(200).send(response_c.rows);
        }
    } catch (error){
        res.status(404).send();
    }
};

const getArtistTracks = async (req, res) => {
    try {
        const response_b = await pool.query('SELECT * FROM Artist WHERE id = $1', [req.params.id]);
        if (response_b.rows.length == 0){
            res.status(404).send();
        }
        else{
            const response_e = await pool.query('SELECT * FROM Track WHERE album_id = (SELECT id FROM Album WHERE artist_id = $1)',[req.params.id]);
            res.status(200).send(response_e.rows);
        }
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
        if (response_g.rows[0].length == 0){
            res.status(404).send();
        }
        else{
            res.status(200).send(response_g.rows[0]);
        }
    } catch (error){
        res.status(404).send();
    }   
};

const getAlbumTracks = async (req, res) => {
    try {
        const response_g = await pool.query('SELECT * FROM Album WHERE id = $1', [req.params.id]);
        if (response_g.rows.length == 0){
            res.status(404).send();
        }
        else{
            const response_h = await pool.query('SELECT * FROM Track WHERE album_id = $1', [req.params.id]);
            res.status(200).send(response_h.rows);
        }
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
        if (response_j.rows[0].length == 0){
            res.status(404).send();
        }
        else{
            res.status(200).send(response_j.rows);
        }
    } catch (error){
        res.status(404).send();
    }
};

//POSTS
const createArtist =  async (req, res) => {
    try {
        let {name, age } = req.body;
        if(typeof name != 'string' || typeof age != 'number' || name == null || age == null){
            res.status(400).send()
        }
        else{
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

            let view_inicial = await pool.query('SELECT * FROM Artist where id = $1', [encoded_corto]);

            //si no está creado
            if (view_inicial.rows.length == 0){
                const response_k = await pool.query('INSERT INTO Artist (id, name, age, albums, tracks, self) VALUES ($1, $2, $3, $4, $5, $6)',
                        [encoded_corto, name, age, url_albums, url_tracks, me]
                    );

                const view = await pool.query('SELECT * FROM Artist where id = $1', [encoded_corto]);
                res.status(201).send(view.rows[0])
                
            }
            else {
                const view_final = await pool.query('SELECT * FROM Artist where id = $1', [encoded_corto]);
                res.status(409).send(view_final.rows[0])
            } 
            
        }

    } catch(error){
        res.status(404).send()
    }
};

const createAlbum =  async (req, res) => { 
    try{
        let {name, genre } = req.body;
        console.log('entré aqui')
        console.log('pasé las variables')
        if(typeof name != 'string' || typeof genre != 'string' || name == null || genre == null){
            console.log('entre al if')
            res.status(400).send()
        }
        else{
            console.log('entré al else')
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

            let existe_artista = await pool.query('SELECT * FROM Artist where id = $1', [req.params.id]);
            //no existe el artista
            if(existe_artista.rows.length == 0){
                res.status(422).send()
            }
            else{
                let view_inicial = await pool.query('SELECT * FROM Album where id = $1', [encoded_corto_1]);
                //si no está creado
                if (view_inicial.rows.length == 0){
                    console.log('voy a nacer')
                    const response_l = await pool.query('INSERT INTO Album (id, artist_id, name, genre, artist, tracks, self) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                                [encoded_corto_1, req.params.id , name, genre, url_artist, url_tracks, me]
                            );
                    const view_2 = await pool.query('SELECT * FROM Album where id = $1', [encoded_corto_1])
                    res.status(201).send(view_2.rows[0])
                }
                else {
                    const view_final = await pool.query('SELECT * FROM Album where id = $1', [encoded_corto_1]);
                    res.status(409).send(view_final.rows[0])
                }
            } 
        }

    } catch(error){
        res.status(404).send()
    }
};

const createTrack =  async (req, res) => {
    try{
        let {name, duration } = req.body;
        console.log(duration)
        if(typeof name != 'string' || typeof duration != 'number' || name == null || duration == null){
            console.log('entre al if')
            res.status(400).send()
        }
        else{
             // https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
            const search = await pool.query('SELECT artist_id FROM Album WHERE id = $1', [req.params.id]);
            console.log(search.rows[0].artist_id)
            
            let buff_1 = new Buffer(name + ':' + req.params.id);
            let encoded_1 = buff_1.toString('base64');
            var encoded_corto_3 = encoded_1.substring(0,22);

            var cadena1 = "hhttps://gigiappt2.herokuapp.com/artists/";
            var url_artist = cadena1 + search.rows[0].artist_id;

            var cadena3 = "hhttps://gigiappt2.herokuapp.com/albums/";
            var url_album = cadena3 + encoded_corto_3;

            var cadena5 = "hhttps://gigiappt2.herokuapp.com/tracks/";
            var me = cadena5 + encoded_corto_3;

            let existe_album = await pool.query('SELECT * FROM Album where id = $1', [req.params.id]);
            //no existe el album
            if(existe_album.rows.length == 0){
                res.status(422).send()
            }
            else{
                let view_inicial = await pool.query('SELECT * FROM Track where id = $1', [encoded_corto_3]);
                //si no está creado
                if (view_inicial.rows.length == 0){
                    console.log('voy a nacer')
                    const response_m = await pool.query('INSERT INTO Track (id, album_id, name, duration, times_played, artist, album, self) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                            [encoded_corto_3, req.params.id, name, duration, 0, url_artist, url_album, me]
                        );
                    var view_3 = await pool.query('SELECT * FROM Track where id = $1', [encoded_corto_3])
                    res.status(201).send(view_3.rows[0])
                }
                else{
                    const view_final = await pool.query('SELECT * FROM Track where id = $1', [encoded_corto_3]);
                    res.status(409).send(view_final.rows[0])
                }
            }
        }
    } catch(error){
        res.status(404).send()
    }
};

const createArtistById = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};

const createArtistTracks = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};




//PUTS
const playTrackById = async (req, res) => {
    let view_inicial = await pool.query('SELECT * FROM Track where id = $1', [req.params.id]);
    //no existe la canción
    if(view_inicial.rows.length == 0){
        res.status(404).send()
    }
    else{
        try {
            const times = await pool.query('SELECT times_played FROM Track WHERE id = $1', [req.params.id]);
            const response_n = await pool.query('UPDATE Track SET times_played = $1 WHERE id = $2', [times.rows[0].times_played + 1, req.params.id]);
            res.status(200).send("canción reproducida");
        } catch (error){
            res.status(404).send('mal');
        }
    }
};

const playTracksAlbum = async (req, res) => {
    let view_inicial = await pool.query('SELECT * FROM Album where id = $1', [req.params.id]);
    //si el album no existe
    if(view_inicial.rows.length == 0){
        res.status(404).send()
    }
    else{
        let times_1 = await pool.query('SELECT times_played FROM Track WHERE album_id = $1', [req.params.id]);
        console.log("pasé query 1")
        try {
            let ids = await pool.query('SELECT id FROM Track WHERE album_id = $1', [req.params.id]);
            console.log("pasé query 2")
            var response;
            for (var i = 0; i < (times_1.rows).length; i++){
                console.log(times_1.rows[i].times_played, ids.rows[i].id)
                console.log(times_1.rows[i].times_played + 1, ids.rows[i].id)
                response = await pool.query('UPDATE Track SET times_played = $1 WHERE id = $2', [times_1.rows[i].times_played + 1, ids.rows[i].id]);
            }
            let final_tracks = await pool.query('SELECT * FROM Track WHERE album_id = $1', [req.params.id]);
            console.log(final_tracks.rows)
            res.status(200).send();
        } catch (error){
            res.status(404).send();
        }  
    }
    
};

const playArtistAlbums = async (req, res) => {
    console.log('entre aqui')
    let view_inicial = await pool.query('SELECT * FROM Artist where id = $1', [req.params.id]);
    //si el artista no existe
    if(view_inicial.rows.length == 0){
        console.log('primer if')
        res.status(404).send()
    }
    else{
        console.log("primer else")
        let ids_albums = await pool.query('SELECT id FROM Album WHERE artist_id = $1', [req.params.id]);
        console.log('ids de albums',ids_albums.rows)
        try {
            console.log('entré try')
            var aux_900;
            var ids_tracks = [];
            for(var p = 0; p< ids_albums.rows.length; p++){
                aux_900 = await pool.query('SELECT id FROM Track WHERE album_id = $1',[ids_albums.rows[p].id])
                console.log('lo que sale del aux', aux_900.rows)
                for(var t = 0; t< aux_900.rows.length; t++){
                    ids_tracks.push(aux_900.rows[t])
                } 
            }
            console.log('final de ids tracks', ids_tracks)
            console.log('id concreto', ids_tracks[0].id)
            console.log('primera query')
            var times_tracks = [];
            var aux_300;
            for (var i = 0; i < ids_tracks.length; i++){
                console.log('ids_tracks_a_query', ids_tracks[i].id)
                aux_300 = await pool.query('SELECT times_played FROM Track WHERE id = $1', [ids_tracks[i].id]);
                console.log('salida query times', aux_300.rows[0])
                times_tracks.push(aux_300.rows[0])
            }
            console.log(times_tracks)
            var response;
            for (var i = 0; i < times_tracks.length; i++){
                response = await pool.query('UPDATE Track SET times_played = $1 WHERE id = $2', [times_tracks[i].times_played + 1, ids_tracks[i].id]);
            }
            res.status(200).send();
        } catch (error){
            res.status(404).send();
        }
    }
};

const putArtist = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};

const putArtistById = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};

const putArtistAlbums = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};

const putArtistTracks = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};





//DELETE
const deleteArtist = async (req, res) => {
    let existe_artista = await pool.query('SELECT * FROM Artist WHERE id = $1', [req.params.id]);
        //no existe artista
        if(existe_artista.rows.length == 0){
            res.status(404).send()
        }
        else{
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
                res.status(404).send('mal');
            }
        }
};

const deleteTrack = async (req, res) => {
    try {
        let existe_track = await pool.query('SELECT * FROM Track WHERE id = $1', [req.params.id]);
        //no existe la canción
        if(existe_track.rows.length == 0){
            res.status(404).send()
        }
        else{
            const response_z = await pool.query('DELETE FROM Track WHERE id = $1', [req.params.id]);
            res.status(204).send();
        }
    } catch (error){
        res.status(404).send();
    }
};

const deleteAlbum = async (req, res) => {
    let existe_album = await pool.query('SELECT * FROM Album WHERE id = $1', [req.params.id]);
        //no existe album
        if(existe_album.rows.length == 0){
            res.status(404).send()
        }
        else{
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
                res.status(404).send('mal');
            } 
        }
};

const deleteArtist_gen = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};

const deleteArtistAlbums = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};

const deleteArtistTracks = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
    }
};

//general
const genericMethod = async (req, res) => {
    try {
        res.status(405).send();
    } catch (error){
        res.send();
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
    deleteAlbum,
    putArtist,
    deleteArtist_gen,
    createArtistById,
    putArtistById,
    putArtistAlbums,
    deleteArtistAlbums,
    createArtistTracks,
    putArtistTracks,
    deleteArtistTracks,
    genericMethod
}