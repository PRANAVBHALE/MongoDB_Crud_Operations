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

  blogPosts:[{
    type:Schema.Types.ObjectId,
    ref:'blogPost'
  }],
//  postCount:Number,

  posts:[PostSchema]            //comes from postschema subdocument
})

UserSchema.virtual('postCount').get(function(){
//  console.log('hello');

return this.posts.length

})

UserSchema.pre('remove',function(next){
//  this === joe
  const BlogPost = mongoose.model('blogPost')

  blogPost.remove({_id: {$in:this.blogPosts}})
    .then(()=> next())
})

const User = mongoose.model('user',UserSchema)

module.exports = User
