var Register = {};
var profileSchema = require("mongoose").model("Userprofile");
//var AdminSchema = require("mongoose").model("Adminprofile");
var config=require("../../config/config");

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
var jwt    = require('jsonwebtoken');


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
                req.body.removeAccount = true;
                let profile = new profileSchema(req.body);
                profile.save()
                    .then(function (response) {
                        console.log("save")

                        var out = {
                            msg: "sucesss",
                            response: response

                        }
                        res.json(out);
                    })
                    .catch(function (err) {

                        var out = {
                            msg: "Error in save",
                            response: err

                        }
                        res.json(out);

                    })

            } else {
                if (obj.email == req.body.email && obj.username == req.body.username) {
                    var out = {
                        msg: 'username and email already existed',
                        // response:obj

                    }
                    res.json(out);

                } else if (obj.email == req.body.email) {
                    var out = {
                        msg: 'email already existed',
                        // response:obj

                    }
                    res.json(out);


                } else if (obj.username == req.body.username) {
                    var out = {
                        msg: 'username already existed',
                        // response:obj

                    }
                    res.json(out);

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
                var out = {
                    msg: 'your profile has been successfully updated',
                    response: result

                }
                res.json(out);
                // res.send("updated")

            } else {

                var out = {
                    msg: 'update failed like did not matched id',
                    // response: result

                }
                res.json(out);
                // res.send("updated Failure")

            }




        });

}




Register.delete = function (req, res) {

    /*
    profileSchema.deleteOne({
        _id: req.body.id
    }, function (err, result) {

        if (!err) {
            res.send("user delete")

        } else {
            res.send("user delete Failure")

        }
        
    }); */



    var RemoveAccount = {
        removeAccount: req.body.removeAccount,
    }

    profileSchema.update({
        '_id': req.body.id
    }, {
            $set: RemoveAccount
        }, function (err, result) {

            if (!err) {
                var out = {
                    msg: 'Account Removed Successfully',
                    response: result

                }
                res.json(out);
                // res.send("updated")

            } else {

                var out = {
                    msg: 'Unable to delete like did not matched id',
                    // response: result

                }
                res.json(out);
                // res.send("updated Failure")

            }




        });




}


Register.ActiveAccount = function (req, res) {

    var token=req.body.token;

var a={}
    

  jwt.verify(token, config.secret, function(err, decoded) {      
      if (!err) {
            // req.decoded = decoded;   
        console.log("acess") 
        console.log(decoded)
         a=decoded
         a.status=true;
        
      } else {

//console.log(err)
      //  res.writeHead(200, {'Content-Type': 'text/plain',});
         // res.json({err:err, success: false, message: 'Failed to authenticate token.' });  
     a={err:err, success: false, message: 'Failed to authenticate token.',status:false }
      }
    });


    if(a.status)
        {


            profileSchema.update({
        '_id': req.body.id
    }, {
            $set: {
                active: req.body.active
            }
        }, function (err, result) {

            if (!err) {
                var out = {
                    msg: 'Active Account Successfully updated',
                    response: result,
                    tokenStatus:a,
                    token:token

                }
                res.json(out);
                // res.send("user Active Account updated")

            } else {
                var out = {
                    msg: 'Active Account updated Failure like did not matched id',
                    // response: result

                }
                res.json(out);
                //res.send(" Active Account updated Failure")

            }




        });


        }
    else{

 res.json(a);

     }

    

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


            if (result != null) {

                bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                    if (err) return next(err);
                    bcrypt.compare(req.body.password, result.password, function (err, isMatch) {
                        if (err) {
                            return console.error(err);
                        }

                        if (isMatch) {

                            var token = jwt.sign({id:result._id}, config.secret, { expiresIn: 60*60 });


              var outPut = {
                                msg: "You have been successfully logged",
                                id:result._id,
                                 token:token,
                                Match: isMatch

                            }
                            res.send(outPut);


                        } else {
                            var outPut = {
                                msg: "Password does not match",
                                Match: isMatch

                            }
                            res.send(outPut);




                        }

                    });


                });

            }
            else {
                //res.send("No data pls register");
                var outPut = {
                    msg: "invalid login details"


                }
                res.send(outPut);

            }


        } else {
            res.send("err", err)

        }

    });

}



module.exports = Register;