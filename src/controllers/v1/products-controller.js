const Products = require('../../mongo/models/products');

const createProduct = async(req, res) => {
    try {
        const { title, desc, price, image, userId } = req.body;
        const Product = await Products.create({
            title,
            desc,
            price,
            image,
            user: userId
        });
        res.send({ status: 'Createdproduct', data: Product });
    } catch (e) {
        console.log('create Product error', e);
        res.status(500).send({ status: 'Error', error: e.message });

    }
};

const deleteProduct = (req, res) => {

};

const getProducts = async(req, res) => {
    try {
        const products = await Products.find().select('title desc price').populate('user', 'username email data role');
        res.send({ status: 'OK', data: products });
    } catch (e) {
        console.log('Find Product error', e);
        res.status(500).send({ status: 'Error', error: e.message });

    }

};



module.exports = {
    createProduct,
    deleteProduct,
    getProducts
};