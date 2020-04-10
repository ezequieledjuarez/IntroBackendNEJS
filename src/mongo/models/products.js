const mongoose = require('mongoose');

//const schema = mongoose.schema;
const [Schema] = mongoose;

const productSchema = new Schema({

    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: ({ type: String, required: true }),
    user: { type: mongoose.Schema.type.ObjectID, ref: 'User' }

}, { timestamps: true });


const model = mongoose.model('product', productSchema);

module.exports = model;