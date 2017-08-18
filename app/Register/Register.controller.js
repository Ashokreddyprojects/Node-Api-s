var Register = {};
var profileSchema = require("mongoose").model("Userprofile");
//var AdminSchema = require("mongoose").model("Adminprofile");

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;



Register.register = function (req, res) {
    //console.log("TEST:",req.body);

    req.body.active = true;

    //User Register

    profileSchema.findOne({
        $or: [{
            username: req.body.username
        }, {
            email: req.body.email
        }]
    }, function (err, obj) {

        if (!err) {
            if (obj == null) {
                let profile = new profileSchema(req.body);
                profile.save()
                    .then(function (response) {
                        console.log("save")
                        var out = {
                            msg: "sucesss",
                            url: "dashboard"

                        }
                        res.json(out);
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.json("Error in save");
                    })

            } else {
                if (obj.email == req.body.email && obj.username == req.body.username) {
                    res.send("username and email already existed");
                } else if (obj.email == req.body.email) {

                    res.send("email already existed");
                } else if (obj.username == req.body.username) {
                    res.send("username already existed");
                }

            }


        } else {
            console.log("error" + err);

        }


    });





}



Register.update = function (req, res) {

    var updateData = {
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.address


    }

    profileSchema.update({
        '_id': req.body.id
    }, {
        $set: updateData
    }, function (err, result) {

        if (!err) {
            res.send("updated")

        } else {
            res.send("updated Failure")

        }




    });

}




Register.delete = function (req, res) {
    profileSchema.deleteOne({
        _id: req.body.id
    }, function (err, result) {

        if (!err) {
            res.send("user delete")

        } else {
            res.send("user delete Failure")

        }




    });

}


Register.ActiveAccount = function (req, res) {
    profileSchema.update({
        '_id': req.body.id
    }, {
        $set: {
            active: req.body.active
        }
    }, function (err, result) {

        if (!err) {
            res.send("user Active Account updated")

        } else {
            res.send("user Active Account updated Failure")

        }




    });

}



Register.UserLogin = function (req, res) {

    profileSchema.findOne({
        $or: [{
            "username": req.body.username
        }, {
            "email": req.body.username
        }]
    }, function (err, result) {

        if (!err) {
            
            
            if(result!=null)
                {

            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) return next(err);
                bcrypt.compare(req.body.password, result.password, function (err, isMatch) {
                    if (err) {
                        return console.error(err);
                    }
                    var outPut = {
                        "Match": isMatch

                    }
                    res.send(outPut);
                });


            });
                    
                }
            else{
                res.send("No data pls register");
                
            }


        } else {
            res.send("err", err)

        }

    });

}



module.exports = Register;