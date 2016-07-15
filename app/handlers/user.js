var Users = require('../models/user');
var NewUsers = require('../models/newUser');
var rmdir = require('rimraf');
var xlsxj = require('xlsx2json');
var root = require('root-path');
var internalCardLength = 5;
var hitsCount=0;

var transform = function(internalNumber) {
    while (internalNumber.length < internalCardLength) {
        internalNumber = '0' + internalNumber;
    }
    return internalNumber;
}

module.exports.createUsers = function(req, res) {
	    var excelFilePath = root(req.file.path);

        xlsxj(excelFilePath, {
                    dataStartingRow: 2,
                    mapping:{
                        "empId": "B",
                        "employeeName": "C",
                        "internalNumber": "D"
                }}).done(function(jsonArray) {
                 Users.collection.insert(jsonArray, function(err, data) {
                        if(err) return console.error(err);
                    });
                });

        rmdir(root('uploads'), function(err) {
            if(err) return console.error(err);
        });

        res.redirect('/#/manageUsers');

	};

	module.exports.getAllUsers = function(req, res) {
	    Users.find().exec(function(err, users) {
        console.log("Hits on site: ", hitsCount++);
            if(err) {
                console.log("Error in reading users");
                return;
            }
            res.header("Access-Control-Allow-Origin", "*");
            res.send(users == null ? 404 : users);
        });
	};

	module.exports.getUserByEmpId =  function(req, res) {
        Users.findOne({empId: req.params.empId}).exec(function (err, user) {
            if(user)
                return res.send(user);
            else {
                NewUsers.findOne({empId: req.params.empId}).exec(function (err, newUser) {
                    res.send(newUser == null ? 404 : newUser);
                });
            }
        });
    };

    module.exports.getUserByInternalNumber = function(req, res) {
        var validInternalNumber = transform(req.params.internalNumber)
        Users.findOne({internalNumber: validInternalNumber}).exec(function (err, user) {
            if(user == null) {
                res.redirect("/api/register/internalNumber/" + validInternalNumber);
                return;
            }
            res.send(user == null ? 404 : user);
        });
    };

	module.exports.deleteUser = function(req, res) {
        Users.findOneAndRemove({empId: req.params.empId}).exec(function (err, user) {
            res.send(user == null ? 404 : "success");
        });
    };

    module.exports.addUser = function(req, res) {
        var user = new Users(req.body)

        user.save(function(err) {
            if(err)
                res.send(err);
        });
        res.json(user);
    };

    module.exports.updateUser = function(req, res) {

  		Users.findOneAndUpdate({empId: req.params.empId}, req.body).exec(function(err, user) {
  			if(err) {
  				console.log("Error in updating user", err);
  				return;
  			}
            res.send(user == null ? 404 : user);
  		});
  	};

    module.exports.findUserByInternalNumber = function(internalNumber, user) {
        Users.findOne({internalNumber:internalNumber}).exec(function (err, user) {
            if(user==null){
              console.log("Not found with this internalNumber");
            }
           return user;
        });
    };
