var express=require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
module.exports=function(){
    
    var app=express();
     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//   app.post('/',function(req,res){
//       console.log(req.body)
//        
//       res.end("<h1>Anil Kumar Yadav</h1>") 
//        
//    });
    
    var routes=require("../app/routes")
    routes(app)
    return app;
    
    
    
    
    
    
}