const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const customerSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    authorname:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    details:{
        type:String,
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
module.exports = mongoose.model('bookModels',customerSchema);