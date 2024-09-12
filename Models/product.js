const mongoose = require('mongoose');

// Define Store schema
const storeSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true  // Make sure to include this if your schema requires it
    },
    price: {
        type: Number,
        required: true  // Make sure to include this if your schema requires it
    },
    file_url: {
        type: String,
        required: true
    },
    uploaded_at: {
        type: Date,
        default: Date.now
    }
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
