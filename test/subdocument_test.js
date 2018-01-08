const assert = require('assert');
const User = require('../src/user')

describe('Subdocument',()=>{
  it('should create a subdocument',(done)=>{
    const joe = new User({
      name:'Joe',
      posts:[{
          title:'My fav food'
      }]
    })

    joe.save()
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
        assert(user.posts[0].title ==='My fav food')
        //done()
      })

      done()
  })


  it('should add subdocuments to an existing record',(done)=>{
    const joe = new User({
      name:'Joe',
      posts:[]
    })

    joe.save()
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
        user.posts.push({title:'New Post'})
        return user.save()
      })
      .then(()=>User.findOne({name:"Joe"}))
      .then((user)=>{
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })


  it('should delete subdocuments to an existing record',(done)=>{
    const joe = new User({
      name:'Joe',
      posts:[{title:'My fav food'}]
    })

    joe.save()
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
        user.posts[0].remove()
        return user.save()
      })
      .then(()=>User.findOne({name:"Joe"}))
      .then((user)=>{
        assert(user.posts.length === 0)
        done()
      })
  })
})
