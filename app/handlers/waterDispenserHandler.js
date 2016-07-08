var WaterConsumption = require("../models/waterConsumption");

module.exports.getConsumptionOfEmployee = function(req,res){
	var employeeId = req.params.empId;
	WaterConsumption.find({empId:employeeId}).exec(function (err, waterConsumptions) {
		if(waterConsumptions){
			res.json(waterConsumptions);
		}
		else {
			res.status(404).send("");	
		}
	});
}


module.exports.insertConsumptionAmount = function(req,res){
	var internalNumber = req.params.internalNumber;
	var consumptionAmount = req.params.consumptionAmount;
	var empId // = find by internalNumber

	var waterConsumption = new WaterConsumption({
		empId: employeeId,
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

module.exports.leaderboard = function (req,res) {

	// var sorted_waterConsumptionList = WaterConsumption.sort_by_consumptionAmount

	// var firstTopTenWaterConsumption = sort_by_consumptionAmount.first(10)

	// res.json(firstTopTenWaterConsumption);


}

