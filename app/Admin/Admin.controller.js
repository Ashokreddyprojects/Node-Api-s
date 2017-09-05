var Admin = {};
var AdminSchema = require("mongoose").model("Adminprofile");
//var AdminSchema = require("mongoose").model("Adminprofile");

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;



Admin.register = function (req, res) {
    //console.log("TEST:",req.body);

                let profile = new AdminSchema(req.body);
                profile.save()
                    .then(function (response) {
                        console.log("save",response)
                        var out = {
                            msg: "sucesss",
                            url: "dashboard",
                            status:response

                        }
                        res.json(out);
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.json("Error in save");
                    })

      


  





}




Admin.update = function (req, res) {
    console.log(req.body)

    let updateData = {
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.address


    }

    AdminSchema.update({
        '_id': req.body.id
    }, {
        $set: updateData
    }, function (err, result) {

        if (!err) {
            
            console.log(result.n)
            if(result.n==0)
                {
                     res.send("Did not matched admin upadated data")
                    
                } else
                {
                    
                     res.send("Admin Data updated")
                }
            
           

        } else {
        
            
            res.send("Admin Data updated Failure")

        }




    });

}







module.exports = Admin;