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


module.exports.getTopConsumers = function (req, res) {
	var today = new Date();
	today.setHours(0, 0, 0, 0);

	WaterConsumption.aggregate([{$match: {timeStamp: {$gt: today}}}, {
		$group: {
			_id: "$empId",
			consumption: {$sum: "$consumptionAmount"}
		}
	}, {$sort: {consumption: -1 }}]).limit(5).exec(function (err, con) {

		if (err) {
			console.log("Error in reading users");
			return;
		}
		res.send(con == null ? 404 : con);
	});

};

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
					res.send(response);
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
