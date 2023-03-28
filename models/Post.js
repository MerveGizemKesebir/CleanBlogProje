const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema

const PostSchema = new Schema ({
    
    title: String,
    detail: String,
    
    dateCreated : {
        type : Date,
        default : Date.now,
    } ,
    
}, {versionKey : false});



const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

