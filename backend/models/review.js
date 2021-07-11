const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    sellername: {
        type: String
    },

    buyername : {
        type: String
    },
    
    review : {
        type : String
    },
    rating : {
        type : Number
    }
});

var Review = mongoose.model('review', userSchema);
module.exports = Review;