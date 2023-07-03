const EventEmitter=require("events") //this is class (starting with capital)

const event=new EventEmitter(); // creating instance

event.on("Saymyname",()=>{ //listening the event
    console.log("Faizan")
});

event.on("Saymyname",()=>{ //this is the benefit of nodejs we can call event multiple time easily
    console.log("Kashan")
});

event.on("Saymyname",()=>{ 
    console.log("Ninja")
});

event.on("checkpage",(sc,msg)=>{ 
    console.log(`status code ${sc} and the page is ${msg}`)
});



event.emit("Saymyname"); //emit means calling event
event.emit("checkpage",200, "ok")



