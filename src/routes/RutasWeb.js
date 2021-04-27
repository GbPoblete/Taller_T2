const {Router} = require('express');
const router = Router();

const { getUsers, createUsers, getUserById, deleteUsers } = require('../controllers/app.controller')

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUsers);
// router.delete('users/:id', deleteUsers);
module.exports = router;