const os=require("os");

console.log(os.arch());  //give the architecture of os

const freeMem=os.freemem();

console.log(freeMem);  //gives value in bytes 
console.log(`${freeMem/1024/1024/1024}`);  //gives value in GB

const totalMem=os.totalmem();

console.log(totalMem);  //gives value in bytes 
console.log(`${totalMem/1024/1024/1024}`);  //gives value in GB

console.log(os.hostname());
console.log(os.platform());
console.log(os.tmpdir());
console.log(os.type());
