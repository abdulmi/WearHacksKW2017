var db = require('../database/storage')

function notify() {
  db.getAllPerscriptions((err,res)=>{
    if(err){
      console.log(err)
    }else {
      console.log(res)
    }
  })
}

var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my 5 minutes check");
  notify()
  // do your stuff here
}, the_interval);
