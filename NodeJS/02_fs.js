//Async
console.log("Async 1")
fs.readdir('./', function(err,files){  //current directory
    if(err){
      console.log("Err", err)
    }
    else{
        console.log("Files", files)
    }

})
console.log("Async 2")