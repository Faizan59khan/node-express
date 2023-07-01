//the http.createServer() method includes request and response parameters which is supplied by node.js

const http=require("http");

const fs=require("fs");

const server=http.createServer((req,res)=>{
//     console.log(req.url)
//    res.end("Hello from the other sides")

// const data = fs.readFile(`${__dirname}/userapi/userapi.json`,"utf-8") //synchronous working
// const objData=JSON.parse(data)          //Load Once and used


    



//for routing:
if(req.url="/"){
    fs.readFile(`${__dirname}/userapi/userapi.json`,"utf-8",(err,data)=>{ //Asynchronous working
        console.log(data);
        const objData=JSON.parse(data)

        //res.end(objData.data[0].type)

       res.end(data)
 })
   //res.end("<h1>Home</h1>")




//    //synchronous
//    res.end(objData)

   
}
else if(req.url="/about"){
    res.write("About")
    res.end();
}
else if(req.url= "/userapi"){
 
   res.end("user")
}


else{
    res.writeHead(404) //it add in status (check in inspect network)
    res.end("404 Error! Page not exists")
}

});

server.listen(8000, "127.0.0.1",()=>{
    console.log("Listening to the port number 8000")
}); //port no
