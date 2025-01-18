const mongoose = require("mongoose");

let blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    content : {
        type : String,
    },
    snippet : {
        type : String,
        required : true,
    },
});

let Blogs = new mongoose.model("Blogs", blogSchema);

module.exports = Blogs;