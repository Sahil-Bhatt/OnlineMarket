const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    sellername:{
        type : String
    },
    
    productname:{
        type: String
    },
    
    price:{
        type: Integer
    },
    
    minimum_quantity:{
        type: Integer
    },
    
    ordered_so_far:{
        type: Integer
    },

    dispatch_status:{
        type: String
    },

    rating: {
        type: Integer
    }

});

var listeditems = mongoose.model('listeditems', userSchema);
module.exports = listeditems;