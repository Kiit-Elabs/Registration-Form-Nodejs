//IMPORTING THE PACKAGES WE HAVE INSTALLED INTO OUR PROJECT
const mongoose = require('mongoose');

//CREATING A SCHEMA
const PostSchema = new mongoose.Schema({

    name: String,
    email: String,
    roll: String,
    mobile: String,
    branch: String,
    year: String,
    apply_for: String,
    
    createdAt: {
        type: Date,
        default: new Date()
    }
  });
  
  const Post = mongoose.model('Post', PostSchema);
  
  
//EXPORTING THE SCHEMA
  module.exports = Post;