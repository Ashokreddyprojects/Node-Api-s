var Project={};
var projectSchema = require("mongoose").model("ProjectList");

Project.create=function(req,res)
    {   
                   let project = new projectSchema(req.body);
                                    project.save()
                                    .then(function(response) {
                                        console.log("save")
                                        var out={msg:"Project saved"                                            
                                        }
                                        res.json(out);
                                    })
                                    .catch(function(err) {
                                        console.log(err);
                                        res.json("Error in save");
                                    })
    }



        Project.update=function(req,res)
    {
                 
        projectSchema.update({'_id':req.body.id}, 
        { $set: req.body}, function(err, result){
            
            if(!err)
                {
                   res.send("Project updated") 
                    
                }
            else
                {
                    res.send("Project updated Failure") 
                    
                }
            
            
            
            
        });
                         
    }
        
        
           Project.delete=function(req,res)
            {
                    projectSchema.deleteOne({_id: req.body.id}, function(err, result){
            
            if(!err)
                {
                   res.send("Project delete") 
                    
                }
            else
                {
                    res.send("Project delete Failure") 
                    
                }
            
            
            
            
        });
               
           }

    

    module.exports=Project;