const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    
    buyername:{
        type : String
    },

    sellername:{
        type : String
    },
    
    productname:{
        type: String
    },
    
    quantity:{
        type : Number
    },

    dispatch_status:{
        type: String
    },

    pimage: {
        type: String
    },

    minimum_quantity: {
        type : Number
    },

    rating : {
        type : Number
    }

});

var Productbuy = mongoose.model('productbuy', userSchema);
module.exports = Productbuy;