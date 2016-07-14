var userHandler = require("./handlers/user");
var newUserHandler = require("./handlers/newUser")
var logHandler = require("./handlers/log")
var loginHandler = require("./handlers/login")
var waterDispenserHandler = require("./handlers/waterDispenserHandler")
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var passport = require('passport');
var expressSession = require('express-session');


module.exports = function(app) {
    app.use(expressSession({secret: 'mySecretKey'}));
    app.use(passport.initialize());
    app.use(passport.session());

	app.get('/api/waterdispenser/topConsumers/', waterDispenserHandler.getTopConsumers);
	app.get('/api/waterdispenser/consumption/empId/:empId', waterDispenserHandler.getTodaysConsumptionOfEmployee);
	app.get('/api/waterdispenser/consumption/new/internalNumber/:internalNumber/consumption/:consumptionAmount',waterDispenserHandler.insertConsumptionAmountByInternalCardNumber);
  app.get('/api/waterdispenser/consumption/new/empId/:empId/consumption/:consumptionAmount',waterDispenserHandler.insertConsumptionAmountBymployeeId);


  // app.get('/api/leaderboard/overall/limit/:limit',leaderboardHandler.overallLeaderboard);
  // app.get('/api/leaderboard/daily/limit/:limit',leaderboardHandler.dailyLeaderboard);
  // app.get('/api/leaderboard/weekly/limit/:limit',leaderboardHandler.weeklyLeaderboard);
  // app.get('/api/leaderboard/monthly/limit/:limit',leaderboardHandler.monthlyLeaderboard);
  // app.get('/api/leaderboard/yealy/:limit',leaderboardHandler.yearlyLeaderboard);


	//users

	app.post('/api/createUsers', upload.single('users'), userHandler.createUsers);
	app.get('/api/users/', userHandler.getAllUsers);
	app.get('/api/users/empId/:empId', userHandler.getUserByEmpId);
    app.get('/api/users/internalNumber/:internalNumber', userHandler.getUserByInternalNumber);
	app.delete('/api/users/:empId/', userHandler.deleteUser);
    app.post('/api/users/', userHandler.addUser);
    app.put('/api/users/:empId/', userHandler.updateUser);

	
	app.post('/api/register/', newUserHandler.register);
	app.get('/api/register/', newUserHandler.getAllUsers);
	app.get('/api/register/internalNumber/:internalNumber', newUserHandler.getUserByInternalNumber);
	app.put('/api/register/', newUserHandler.approve);
	app.delete('/api/register/:empId', newUserHandler.delete);

	app.post('/api/log/', logHandler.store);

	app.post('/api/login', loginHandler.loginUser);
	app.delete('/api/login', loginHandler.destroyLoginSession);
};
