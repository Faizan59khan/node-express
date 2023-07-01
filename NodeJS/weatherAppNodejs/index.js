const http = require("http");
const fs = require("fs");
var requests = require('requests'); // This package will also require

const homeFile = fs.readFileSync("home.html", "utf-8") //getting home file data in backend

const replaceVal = (tempVal,origVal)=>{
   let temperature=tempVal.replace("{%tempval%}",origVal.main.temp) //replacing value
   temperature=temperature.replace("{%tempmin%}",origVal.main.temp_min) //temperature mai data aachuka
   temperature=temperature.replace("{%tempmax%}",origVal.main.temp_max)
   temperature=temperature.replace("{%Location%}",origVal.name)
   temperature=temperature.replace("{%country%}",origVal.sys.country)
   temperature=temperature.replace("{%tempstatus%}",origVal.weather[0].main)
 return temperature;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {

// add url, data comes chunk by chunk
        requests("https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=a8e87f165324d0871a090f2491c5199f")
            .on('data', (chunk)=> {
                const objData=JSON.parse(chunk) //converting json to obj
                const arrData=[objData]; //now our data is array of an object

              //  console.log(arrData[0].main.temp)  //[{}] //array of obj comes in output (why? use map)
                 
              //join to convert array in string
              const realTimeData=arrData.map((val)=>replaceVal(homeFile,val)).join("") //val contains api
              //console.log(realTimeData)
              res.write(realTimeData)
                        })
            .on('end', (err)=> {
                if (err) return console.log('connection closed due to errors', err);

                console.log('end');
                res.end();
            });

    }
});


server.listen(8000,"127.0.0.1");
