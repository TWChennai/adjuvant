angular.module('adjuvant').directive('addUser', ['mongooseService', '$timeout',
                     function(mongooseService, $timeout) {

    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl: "/partials/addUser.html",
        scope: {},
        link: function(scope) {

            scope.addUser = function() {
                 var user = _constructUser();
                 mongooseService.addUser(user)
                                           .then(_notifySuccess);
            }

            var _notifySuccess = function(response) {
                  scope.showSuccessAlert = true;
                  $timeout(function() {
                      _resetDefaults();
                  }, 1000)
            }

             var _constructUser = function() {
                  return {empId: scope.employeeId,
                          employeeName:  scope.employeeName,
                          internalNumber:  scope.internalNumber};
             }

             var _resetDefaults = function() {
                scope.employeeId = "";
                scope.employeeName = "";
                scope.internalNumber = "";
                scope.showSuccessAlert = false;
             }

             _resetDefaults();
        }
    }
}]);



