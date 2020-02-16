const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    sellername:{
        type : String
    },
    
    productname:{
        type: String
    },
    
    price:{
        type: Number
    },
    
    minimum_quantity:{
        type: Number
    },
    
    ordered_so_far:{
        type: Number
    },

    dispatch_status:{
        type: String
    },

    rating: {
        type: Number
    },

    pimage: {
        type: String
    }


});

var Listeditem = mongoose.model('listeditem', userSchema);
module.exports = Listeditem;