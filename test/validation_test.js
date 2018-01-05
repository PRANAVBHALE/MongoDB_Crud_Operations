const assert = require('assert');
const User = require ('../src/user')


describe('validation records',()=>{

  it('should have username',()=>{
    const user = new User({name:undefined})
    const validationResult = user.validateSync()
  //  console.log(validationResult);
    const {message} = validationResult.errors.name

    assert(message === 'Name is required')
  })

})
