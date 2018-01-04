const assert = require('assert');
const User = require('../src/user.js')


describe('Creating records',()=>{

  it('should save a user',(done)=>{
  //  assert(1+1===3)
  const joe = new User({name:"Joe" })

  joe.save()
    .then(()=>{
      assert(!joe.isNew)     //check for joe already exist
      done()
    })

  })
})
