var mongoose = require("mongoose");

var waterConsumptionSchema = new mongoose.Schema({
  empId: String,
  consumptionAmount: Number,
  timeStamp: Date
});

module.exports = mongoose.model('WaterConsumption', waterConsumptionSchema);
