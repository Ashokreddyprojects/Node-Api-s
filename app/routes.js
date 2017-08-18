var Register=require('./Register/Register.controller')
var Project=require('./Projects/Project.controller')
module.exports=function(app)
{
 
     app.post('/userRegister',Register.register)
     app.post('/userUpdate',Register.update)
     app.post('/userDelete',Register.delete)
     app.post('/userActiveAccount',Register.ActiveAccount)
     app.post('/userLogin',Register.UserLogin)
    
    
     app.post('/createProject',Project.create)
     app.post('/ProjectUpdate',Project.update)
     app.post('/ProjectDelete',Project.delete)
    
}