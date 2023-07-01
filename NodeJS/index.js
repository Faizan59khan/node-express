//REPL
//1:JS Expression
//2:Use Variables
//3:MultiLine Code
//4:use (_) to get the last result
//5:we can use editor mode

//Video 5: Node.js core modules

const name = "faizan"
console.log(name)

//fs module 
 const fs = require('fs') 
 //fs.writeFileSync('read.txt',"welcome to my website")  //to create new file


// fs.writeFileSync('read.txt',"welcome Back!")  //it will replace the data (dataoveride) 

// //if i dont want to override i want to add the data

// fs.appendFileSync('read.txt'," \nHello Guys!")


//Reading:

// const buf_data= fs.readFileSync('read.txt')
// console.log(buf_data)

//buffer is additional datatype it is mainly used to store binary data while reading from a file.
//output
{/* <Buffer 77 65 6c 63 6f 6d 65 20 42 61 63 6b 21 20 0a 48 65 6c 6c 6f 20 47 75 79 73 21> */}


// org_data = buf_data.toString()
// console.log(org_data)

//to rename the file:
// fs.renameSync('read.txt','readWrite.txt')

//Video 6:
//Challenge time
//1) Create a folder name it faizan
//2) Create a file in it name bio.txt and data into it
//3) Add more data in the file at the end of existing data
//4) Read the data without getting the buffer data at first.
// File encoding
//5) Rename the file name to mybio.txt.
//6) Now delete both the file and folder











