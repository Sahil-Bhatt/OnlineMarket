const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    buyername: {
        type: String
    },
    productname: {
        type: String
    },
    ordered_quantity: {
        type: Number
    }
});

var Purchase = mongoose.model('purchase', userSchema);
module.exports = Purchase;