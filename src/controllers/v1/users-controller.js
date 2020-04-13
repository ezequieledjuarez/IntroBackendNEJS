const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Users = require('../../mongo/models/users');

const expiresIn = 60 * 10;

const logIn = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            const isOk = await bcrypt.compare(password, user.password);
            if (isOk) {
                const token = jwt.sign({ userId: user._id, role: user.role },
                    process.env.JWT_SECRET, { expiresIn }
                );
                res.send({
                    status: 'Ok',
                    data: {
                        token,
                        expiresIn
                    }
                });
            } else {
                res.status(403).send({ status: 'INVALID_PASSWORD', message: '' })
            }

        } else {
            res.status(401).send({ status: 'USER_NOTFOUND', message: '' });
        }

    } catch (e) {
        res.status(500).send({ status: 'Error', message: e.message });
    }
}


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
    updateUser,
    logIn
};