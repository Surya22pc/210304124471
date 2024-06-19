const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    discount: { type: Number, required: true },
    availability: { type: String, enum: ['yes', 'out-of-stock'], required: true }
});

module.exports = mongoose.model('Product', ProductSchema);

