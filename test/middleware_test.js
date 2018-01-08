const assert = require('assert');
const User = require('../src/user.js')
const mongoose = require('mongoose');
const BlogPost = require('../src/blogPost.js')

describe('Middeware',(done)=>{
  let joe,blogPost;

  beforeEach((done)=>{
    joe =  new User({name:'Joe'})
    blogPost =  new BlogPost({title:'Js is great',content:'Yes i like js'})
  //  comment = new Comment({content : 'Congrats of great post'})


    joe.blogPosts.push(blogPost)
  //  blogPost.comments.push(comment)

  //  comment.user = joe

    Promise.all([joe.save(),blogPost.save()])
      .then(()=> done());
  })

  it('user clean up dangling blogpostson on remove',(done)=>{
    joe.remove()
      .then(()=> BlogPost.count())
      .then((count)=>{
        assert(count === 10 )
      //  done()
      })
      done()
  })
})
