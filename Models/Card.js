var mongoose         = require('mongoose');

var cardSchema    = mongoose.Schema({
        // The _id property serves as the primary key. If you don't include it
        // the it is added automatically. However, you can add it in if you
        // want to manually include it when creating an object.

        // _id property is created by default when data is inserted.
        title:    {"type" : "String", required: true},
        username:     {"type" : "String", required: true},
        context:      {"type" : "String", required: true},
        date:         {"type" : Date, default: Date.now } ,
    }, 
    {   // Include this to eliminate the __v attribute which otherwise gets added
        // by default.
        versionKey: false 
    });
var Cards    = mongoose.model('FlashCard', cardSchema);
module.exports = Cards;