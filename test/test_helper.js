const mongoose = require('mongoose');


mongoose.Promise = global.Promise

before((done)=>{

  mongoose.connect('mongodb://localhost/users_test')    //users_test === database
  mongoose.connection
    .once('open',()=> {done()})     //once and on event handlers
    .on('error',(error)=>{
      console.warn('wanring',error);
    })

})



beforeEach((done)=>{        //hook used to empty users b4 runing tet suite
  mongoose.connection.collections.users.drop(()=>{
    //ready to tun the next test

    done()
  })
})
