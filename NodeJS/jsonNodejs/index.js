const fs =require("fs");


const bioData={
    name: "faizan",
    age: 21,
    university: "UOK"
};

// console.log(bioData.university)

// //Converting Object In JSON
// const jsonData=JSON.stringify(bioData); //stringify is method 
// console.log(jsonData)  //In the property contains double quotes
// //console.log(jsonData.name) we can not do this in json format

// const objData = JSON.parse(jsonData);
// console.log(objData)


//1)coovert in json
//2)Add in json file
//3) ReadFile 
//4) again convert json to object
//5)console.log

const jsonData=JSON.stringify(bioData); //stringify is method 
 fs.writeFile('json1.json',jsonData,(err)=>{
  console.log("done");
})

fs.readFile('json1.json',"utf-8",(err,data)=>{
    const oriData=JSON.parse(data)
    console.log(data);
   console.log(oriData)
})


