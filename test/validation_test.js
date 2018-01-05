const assert = require('assert');
const User = require ('../src/user')


describe('validation records',()=>{

  it('should have username',(done)=>{
    const user = new User({name:undefined})
    const validationResult = user.validateSync()
  //  console.log(validationResult);
    const {message} = validationResult.errors.name

    assert(message === 'Name is required')
    done()
  })

  it('should not have character less than 2',(done)=>{
    const user = new User({name:'al'})
    const validationResult = user.validateSync()
  //  console.log(validationResult);
    const {message} = validationResult.errors.name
    //console.log(message);

      assert(message ==='Name must be longer than 3 characters')
      done()
  })


  it('should not save invalid data',(done)=>{
    const user = new User({name:'al'})
    user.save()
      .catch((validationResult)=>{
        const {message} = validationResult.errors.name
          assert(message ==='Name must be longer than 3 characters')
          done()
      })

  })


})
