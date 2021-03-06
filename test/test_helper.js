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



// beforeEach((done)=>{        //hook used to empty users b4 runing tet suite
// debugger
//   const  {users,comments,blogposts} = mongoose.connection.collections;
//   users.drop(()=>{
//     comments.drop(()=>{
//       blogposts.drop(()=>{
//         done();
//       })
//     })
//   })
// })
