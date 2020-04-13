const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users');

const createUser = async(req, res) => {
    try {

        const { username, email, password, data } = req.body;


        const hash = await bcrypt.hash(password, 15);

        await Users.create({
            username,
            email,
            data,
            password: hash,

        })
        res.send({ status: 'Ok', message: 'User created' });
    } catch (error) {
        if (error.code && error.code === 11000) {
            res.status(400).send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
            return;
        }
        res.status(500).send({ status: 'ERROR', message: error.message });
    }
};

const deleteUser = (req, res) => {
    res.send({ status: 'OK', message: 'User Deleted' });
};

const getUsers = (req, res) => {
    res.send({ status: 'OK', data: {} });
};

const updateUser = async(req, res) => {
    try {
        const { username, email, data, userId } = req.body;
        await Users.findByIdAndUpdate(userId, {
            username,
            email,
            data
        })
        res.send({ status: 'OK', message: 'User updated' });
    } catch (error) {
        if (error.code && error.code === 11000) {
            res.status(400).send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
            return;
        }
        res.status(500).send({ status: 'Error', message: 'User updated' });
    }
};

module.exports = {
    createUser,
    deleteUser,
    getUsers,
    updateUser
};