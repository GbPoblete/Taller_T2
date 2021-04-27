//Entrar a postgres psql -U postgres

const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'music',
    port: '5432'
});


const getArtist = async (req, res) => {
    const response = await pool.query('SELECT * FROM Artist');
    console.log(response.rows);
    res.json(response.rows);
};

const getArtistById = async (req, res) => {
    const response = await pool.query('SELECT * FROM Artist WHERE id = $1', [req.params.id]);
    res.json(response.rows);
};

const createArtist =  async (req, res) => {
    const {name, age } = req.body;

    let encoded = btoa(name);
    let encoded_corto = encoded.substring(0,22);

    const response = await pool.query('INSERT INTO Artist (id, name, age) VALUES ($1, $2, $3)',
                [encoded_corto, name, age]
            );
    res.json({
        message: 'Artist Added Succesfully',
        body: {
            user: {id, name, age}
        }
    })

};

// const deleteUsers = async (req, res) => {
//     res.send('USER DELETED' + req.params.id);
//     // const response = await pool.query('DELETE FROM prueba_artist WHERE id = $1', [req.params.id]);
//     // console.log(response);
//     // res.json(`User ${id} deleted successfully`);
// };

module.exports = {
    getArtist, 
    createArtist, 
    getArtistById
}