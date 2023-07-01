const fs=require("fs")
const http=require("http")

const server=http.createServer(); //creating server

server.on("request",(req,res)=>{

//  fs.readFile("input.txt",(err,data)=>{
    
//     if(err){                         //this is not streaming (old method)
//        console.log(err)
//     }
//     res.end(data.toString())
//  })

//2nd Streaming MMethod
// const rsStream=fs.createReadStream("input.txt")
// rsStream.on("data",(chunkdata)=>{ //we are calling data event as data is available to read
//    res.write(chunkdata)
// })
// rsStream.on("end",()=>{     //when no more data remaining to read
//     res.end()
// })

// rsStream.on("error",(err)=>{     //when no more data remaining to read
//    console.log(err)
//    res.end("file not found");
// })

//3rd Pipe
const rsStream=fs.createReadStream("input.txt")
rsStream.pipe(res); //response is our destination file(index.js)
 


});

server.listen(8000,"127.0.0.1"); //port and locat host
