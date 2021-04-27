//Entrar a postgres psql -U postgres

const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'music',
    port: '5432'
});


const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM prueba_artist');
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const response = await pool.query('SELECT * FROM prueba_artist WHERE id = $1', [req.params.id]);
    res.json(response.rows);
};

const createUsers =  async (req, res) => {
    const {id, name, age } = req.body;

    const response = await pool.query('INSERT INTO prueba_artist (id, name, age) VALUES ($1, $2, $3)',
                [id, name, age]
            );
    console.log('user created');
    res.json({
        message: 'User Added Succesfully',
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
    getUsers,
    createUsers,
    getUserById,
    // deleteUsers
}