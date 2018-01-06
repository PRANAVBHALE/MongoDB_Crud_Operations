const mongoose = require('mongoose');
const PostSchema = require('./post_schema');

const Schema = mongoose.Schema

const UserSchema = new Schema({

  name:{
    type:String,
    required:[true,'Name is required'],
    validate:{
      validator:(name) => name.length  > 2,
      message:'Name must be longer than 3 characters'
    }
  },
  likes:Number,
//  postCount:Number,

  posts:[PostSchema]            //comes from postschema subdocument
})

UserSchema.virtual('postCount').get(function(){
//  console.log('hello');

return this.posts.length
})

const User = mongoose.model('users',UserSchema)

module.exports = User
