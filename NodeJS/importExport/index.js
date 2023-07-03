// const oper = require('./oper') //we have store in any variable

// console.log(oper)  //this will return object 

// console.log(oper.add(5,6)) //so we call like that
// console.log(oper.sub(5,6))




const {add,sub,name,mul} = require('./oper') //Object destructuring (name should be same )
                                            //order not matter in node (name comes in 3rd )
console.log(add(5,6)) 
console.log(sub(5,6))
console.log(mul(5,6))
console.log(name)

// console.log(add(5,5))
// console.log(sub(10,5))

//console.log(add)  //gives name faizan