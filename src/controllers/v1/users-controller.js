const bcrypt = require('bcrypt');


const createUser = async(req, res) => {
    try {
        console.log('req.body', req.body);

        const hash = await bcrypt.hash(req.body.password, 15);

        console.log('Fin', hash);

        res.send({ status: 'Ok', message: 'User created' });
    } catch (error) {
        res.status(500).send({ status: 'ERROR', message: error.message });
    }
};

const deleteUser = (req, res) => {
    res.send({ status: 'OK', message: 'User Deleted' });
};

const getUsers = (req, res) => {
    res.send({ status: 'OK', data: {} });
};

const updateUser = (req, res) => {
    res.send({ status: 'OK', message: 'User updated' });
};

module.exports = {
    createUser,
    deleteUser,
    getUsers,
    updateUser
};