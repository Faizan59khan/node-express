const add = (a,b)=>{
  return a+b;
}
const sub = (a,b)=>{
    return a-b;
  }
  const mul = (a,b)=>{
    return a*b;
  }

const name="faizan"

//module.exports=add; when export single value
//Multple values

// module.exports.add= add;  //we convert scope private to public now other file also used this function
// module.exports.sub= sub; 
// module.exports.mul= mul; 

//OR
module.exports={add,sub,mul,name} //name comes in 4th

