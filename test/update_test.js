const assert = require('assert');
const User = require ('../src/user')

describe('Updateing records',()=>{

  let joe

  beforeEach((done)=>{
    joe = new User({name:'Joe',postCount:0})
    joe.save()
      .then(()=>done())
  })

  function assertName(operation,done) {
    operation
      .then(()=> User.find({}))       //to find all
      .then((users)=>{
        assert(users.length === 1)
        assert(users[0].name ==='Pranav')
        done();
      })
  }

  it('instance set and save',(done)=>{
  //   console.log(joe);
  // console.log(joe.set('name','Pranav'));
  joe.set('name','Pranav');
  assertName(joe.save(),done)

  //  done()
  })

  it('instance update',(done)=>{
    assertName(joe.update({name:'Pranav'}),done)
  })


  it('class can update',(done)=>{
    assertName(
    User.update({name:'Joe'},{name:'Pranav'}),
    done
    )
  })

  it('class can findOneAndUpdate',(done)=>{
    assertName(
    User.findOneAndUpdate({name:'Joe'},{name:'Pranav'}),
    done
    )
  })

  it('class can findByIdAndUpdate',(done)=>{
    assertName(
    User.findByIdAndUpdate(joe._id,{name:'Pranav'}),
    done
    )

  })

  it('a user can have postcount incremented by 1',(done)=>{
    User.update({
      name:'Joe'
    },{
      $inc:{
        postCount:10
      }
    })
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
        assert(user.postCount ===10)
        done()
      })

  })

})
