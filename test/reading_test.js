const assert = require('assert');
const User = require ('../src/user')


describe('Reading user out the database' , (done) =>{

  let joe,pranav,rohan,rocket

  beforeEach((done)=>{
    joe = new User({name:'Joe'})
    pranav = new User({name:'Pranav'})
    rohan = new User({name:'Rohan'})
    rocket = new User({name:'Rocket'})


    Promise.all([joe.save(),pranav.save(),rohan.save(),rocket.save()])
      .then(() => done())
  });



  it("finds all users witha a aname of joe",(done)=>{
    User.find({
      name:'Joe'
    }).then((users)=>{
    //  console.log(users);
  //  asser(users[0]._id === joe._id)  //cant compare ObjectID === String (=== compare with datatype)
    assert(users[0]._id.toString() === joe._id.toString())
  //    done()
    })
    done()
  })


  it("find user by id",(done)=>{
    User.findOne({
      _id: joe._id
    }).then((user)=>{
      assert(user.name==='Joe')
      done()
    })
  })

  it('should skip and limit the result set',(done) => {
    User.find({}).sort({name: 1}).skip(1).limit(2)   //name: 1 means ascending order
      .then((users)=>{
        assert(users.length === 2)
        assert(users[0].name === 'Joe')
        assert(users[1].name === 'Pranav')
      //  done()
      })

      done()
  })

})
