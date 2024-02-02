const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const customerSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    requester:{
        type:String,
        required:true
    },
    requestedDate:{
        type:String,
        required:true
    },
    returnedDate:{
        type:String,
        required:true
    },
    bookReturned:{
        type:Boolean,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
        
    }
});
module.exports = mongoose.model('bookRequestModels',customerSchema);