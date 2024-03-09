const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'userCollection'
    },
    title : {
        type : String
    },
    discription : {
        type :String
    },
    // image :{
    //     type:String
    // },
    createdDate :{
        type : Date,
        default :Date.now,
    }
})

const blogCollection = new mongoose.model('blogCollection', blogSchema);

module.exports = blogCollection;