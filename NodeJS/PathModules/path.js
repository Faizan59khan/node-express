const path=require("path")

console.log(path.dirname('F:/web n mob/NodeJs/PathModules/path.js')) //F:/web n mob/NodeJs/PathModules
console.log(path.extname('F:/web n mob/NodeJs/PathModules/path.js')) //.js
console.log(path.basename('F:/web n mob/NodeJs/PathModules/path.js')) //gives file name (path.js)

console.log(path.parse('F:/web n mob/NodeJs/PathModules/path.js')) //gives all the things like dir,base,name,root

console.log(path.parse('F:/web n mob/NodeJs/PathModules/path.js').name)

