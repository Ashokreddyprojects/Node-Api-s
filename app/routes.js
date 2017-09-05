var Register=require('./Register/Register.controller')
var Project=require('./Projects/Project.controller')
var Admin=require('./Admin/Admin.controller')
module.exports=function(app)
{
        //user routing
     app.post('/userRegister',Register.register)
     app.post('/userUpdate',Register.update)
     app.post('/userDelete',Register.delete)
     app.post('/userActiveAccount',Register.ActiveAccount)
     app.post('/userLogin',Register.UserLogin)
    
           //project routing
     app.post('/createProject',Project.create)
     app.post('/ProjectUpdate',Project.update)
     app.post('/ProjectDelete',Project.delete)
     app.get('/findProjects',Project.findProjrcts)
    
        //Admin routing
    
    app.post('/AdminRegister',Admin.register)
    app.post('/AdminUpdate',Admin.update)
    
}