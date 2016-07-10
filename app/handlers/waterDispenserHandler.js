var WaterConsumption = require("../models/waterConsumption");
var userHandler = require("../handlers/user");
var Users = require('../models/user');


module.exports.insertConsumptionAmount = function(req,res){
	var consumptionAmount = req.params.consumptionAmount;
	var empId = req.params.empId;
	console.log(empId);
	console.log(consumptionAmount);
	var waterConsumption = new WaterConsumption({
		empId: empId,
		consumptionAmount: consumptionAmount,
		timeStamp: new Date()
	})

	waterConsumption.save(function (err) {
		if(err){
			console.log("Error in saving the beverage", err);
			return;
		}
	});
	res.json(waterConsumption);
}


module.exports.getConsumptionOfEmployee = function(req,res){
	var employeeId = req.params.empId;
	WaterConsumption.find({empId:employeeId}).exec(function (err, waterConsumptions) {
		if(err) {
				console.log("Error in reading users");
				return;
		}
		res.send(waterConsumptions == null ? 404 : waterConsumptions);
	});
}

module.exports.insertConsumptionAmountByInternalCardNumber = function(req,res){
	var internalNumber = req.params.internalNumber;
	var consumptionAmount = req.params.consumptionAmount;
	var response = {};
	response.status = "failure";
	console.log("here here here");

	Users.findOne({internalNumber: internalNumber}).exec(function (err, user) {
			if(user == null) {
					console.log("No users with this internal Number");
			}
			else{

				var waterConsumption = new WaterConsumption({
					empId: user.empId,
					consumptionAmount: consumptionAmount,
					timeStamp: new Date()
				})

				console.log(waterConsumption);

				waterConsumption.save(function (err) {
					console.log("saved consumption");
					response.status = "success";
					res.send(response);


					if(err){
						console.log("Error in saving the consumption", err);
						response.status = "failure";
						res.send(response);
					}
				});
			}
	});


}




module.exports.insertConsumptionAmountBymployeeId = function(req,res){
	var consumptionAmount = req.params.consumptionAmount;
	var empId = req.params.empId;
	console.log(empId);
	console.log(consumptionAmount);



	var waterConsumption = new WaterConsumption({
		empId: empId,
		consumptionAmount: consumptionAmount,
		timeStamp: new Date()
	})

	waterConsumption.save(function (err) {
		if(err){
			console.log("Error in saving the beverage", err);
			return;
		}
	});

	res.json(waterConsumption);
}



// module.exports.leaderboard = function (req,res) {
//
// 	// var sorted_waterConsumptionList = WaterConsumption.sort_by_consumptionAmount
//
// 	// var firstTopTenWaterConsumption = sort_by_consumptionAmount.first(10)
//
// 	// res.json(firstTopTenWaterConsumption);
//
//
// }
