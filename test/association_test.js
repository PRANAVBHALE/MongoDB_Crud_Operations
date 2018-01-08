const assert = require('assert');
const User = require('../src/user.js')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')



describe('Assocations',()=>{

  let joe,blogPost,comment

  beforeEach((done)=>{
    joe =  new User({name:'Joe'})
    blogPost =  new BlogPost({title:'Js is great',content:'Yes i like js'})
    comment = new Comment({content : 'Congrats of great post'})


    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)

    comment.user = joe

    Promise.all([joe.save(),blogPost.save(),comment.save()])
      .then(()=> done());
  })

  it('should save a realtion between user and blogPost',(done)=>{
    User.findOne({name:'Joe'}).populate('blogPosts')
      .then((user)=>{
      //  console.log(user);
        assert(user.blogPosts[0].title ==='Js is great')
      //  done();

      })
        done();
  })

  it('should save full realtion graph',(done)=>{
    User.findOne({name:'Joe'})
      .populate({
        path:'blogPosts',
        populate:{
          path:'comments',
          model:'comment',
          populate:{
            path:'user',
            model:'user'
          }
        }
      })
      .then((user)=>{
      //  console.log(user.blogPost[0].comments[0]);

      assert(user.name==='Joe')
      assert(user.blogPosts[0].title === 'Js is great')
      assert(user.blogPosts[0].comment.content === 'Congrats of great post')


      //  done();
      })
        done()
  })
})
