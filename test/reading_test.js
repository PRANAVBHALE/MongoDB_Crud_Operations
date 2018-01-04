const assert = require('assert');
const User = require ('../src/user')


describe('Reading user out the database' , () =>{

  let joe

  beforeEach((done)=>{
    joe = new User({name:'Joe'})
    joe.save()
      .then(() => done())
  });



  it("finds all users witha a aname of joe",(done)=>{
    User.find({
      name:'Joe'
    }).then((users)=>{
    //  console.log(users);
  //  asser(users[0]._id === joe._id)  //cant compare ObjectID === String (=== compare with datatype)
    assert(users[0]._id.toString() === joe._id.toString())
      done()
    })
  })


  it("find user by id",(done)=>{
    User.findOne({
      _id: joe._id
    }).then((user)=>{
      assert(user.name==='Joe')
      done()
    })
  })

})
