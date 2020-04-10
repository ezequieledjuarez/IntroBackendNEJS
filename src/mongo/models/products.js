const mongoose = require('mongoose');

//const schema = mongoose.schema;
const [Schema] = mongoose;

const productSchema = new Schema({

    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, required: true }], defaults: [] },
    user: { type: mongoose.Schema.type.ObjectID, ref: 'User', required: true }

}, { timestamps: true });


const model = mongoose.model('product', productSchema);

module.exports = model;