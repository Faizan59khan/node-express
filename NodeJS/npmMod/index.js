const chalk=require("chalk")
const validator=require("validator")

// console.log(chalk.blue('Hello world!'));
// console.log(chalk.green('Success'));


const res=validator.isEmail("khan_faizan59@yahoo.com")    //validator is for validate email (now its very easy) 
console.log(res ?chalk.green.inverse(res):chalk.red.inverse(res))  //Include chalk module by using ternary operator