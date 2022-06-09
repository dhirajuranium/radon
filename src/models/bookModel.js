const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: ObjectId,
        ref: "newAuthor"
    },
    publisher: {
        type:ObjectId,
        ref: "newPublisher"
    },
    isHardCover:{
        type:Boolean,
        default:false
    },

    price: Number,
    ratings: Number


}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
