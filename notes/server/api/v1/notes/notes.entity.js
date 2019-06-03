const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    id : {
        type : String,
        require : true
    },
    title : {
        type : String,
        require : true
    },
    text : {
        type : String,
        require : true
    },
    state : {
        type : String,
        require : true,
        default : 'not-started'
    },
    userId : {
        type : String,
        require : true
    },
    createdOn : {
        type : Date,
        default : Date.now()
    },
    modifiedOn : {
        type : Date,
        default : Date.now()
    },
    isFavourite : {
        type : Boolean,
        default : false
    },
    group: {
        type : String
    },
    sharedUsers:{
        type: Array
    }
});

module.exports = mongoose.model('note',NoteSchema);