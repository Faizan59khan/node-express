const fs =require("fs");

//creating file asynchronously
// fs.writeFile('read.txt','today is awesome day!',
// (err)=>{                                                   //call back is necessary
//   console.log("file is created")
//   console.log(err)
// });

//Append in a file
/* fs.appendFile('read.txt',"\namazing",(err)=>{
   console.log("task completed")
}) */

// fs.readFile('read.txt','UTF-8',(err,data)=>{  //1st argument always will be error and 2nd is the data we are getting.
//  console.log(data);
// });                                             //UTF-8 encode buffer data
                
