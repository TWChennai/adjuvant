angular.module('invoiceController', [])
                .controller('invoiceController', ['$scope', '$sce', 'mongooseService', 'invoiceService',
                function($scope, $sce,  mongooseService, invoiceService) {

        $scope.selectedDate = "";
        $scope.invoiceReady = false;
        $scope.generatedTable = "";
        $scope.printDiv = function(divName) {
          var printContents = document.getElementById(divName).innerHTML;
          var popupWin = window.open('', '_blank', 'width=300,height=300,top=200, left=300');
          popupWin.document.open()
          popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
          popupWin.document.close();
        }

        var orders = {};
        var menu = {};
        $scope.getInvoice = function() {
            $scope.generatedTableForCTL = "";
            $scope.generatedTableForJuices = "";
            return mongooseService.getOrdersForSelection({"startDate": _setStartOfDate($scope.selectedDate),
                                                          "endDate": _setEndOfDate(new Date($scope.selectedDate))})
                                .then(_extractRegisterOrders)
                                .then(_getJuiceMenu)
                                .then(_constructInvoice)
        }

        $scope.getInvoiceWithInRange = function() {
            $scope.generatedTableForCTL = "";
            $scope.generatedTableForJuices = "";
            return mongooseService.getOrdersForSelection({"startDate": _setStartOfDate($scope.startDate),
                                                          "endDate": _setEndOfDate($scope.endDate)})
                                .then(_extractRegisterOrders)
                                .then(_getJuiceMenu)
                                .then(_constructInvoice)
        }

        $scope.setInvoiceForDate = function() {
            $scope.generatedTable = "";
            $scope.invoiceForDate = true;
            $scope.invoiceForPeriod = false;
            $scope.invoiceReady = false;
        }

        $scope.setInvoiceForPeriod = function() {
            $scope.generatedTable = "";
            $scope.invoiceForDate = false;
            $scope.invoiceForPeriod = true;
            $scope.invoiceReady = false;
        }

        var _extractRegisterOrders = function(response) {
          var juiceChoice = [];
          _.each(response.data, function(order) {
            var drinkName = order.drinkName;
            _.times(order.quantity, function() {
                juiceChoice.push(drinkName)
            })
          })
          orders =  _.countBy(juiceChoice , _.identity);
        }

        var _getJuiceMenu = function() {
            return mongooseService.getBeverages()
                                .then(_buildMenu)
        }

        var _constructInvoice = function() {
            _constructCTLInvoice();
            _constructJuiceInvoice();
            $scope.invoiceReady = true;
        }

        var _constructCTLInvoice = function() {
            var CTLOrders = getOnlyCTLOrders();
            if(CTLOrders.CTL) {
                $scope.generatedTableForCTL = $sce.trustAsHtml(invoiceService.generateInvoice(menu, CTLOrders));
            }
        }

        var _constructJuiceInvoice = function() {
            var juiceOrders = getOnlyJuicesOrders();
            $scope.generatedTableForJuices = $sce.trustAsHtml(invoiceService.generateInvoice(menu, juiceOrders));
        }

        var _buildMenu = function(response) {
             _.each(response.data, function(item) {
                     menu[item.name] = item.cost;
             })

        }

        var _setStartOfDate = function(startDate) {
            startDate.setSeconds(0);
            startDate.setHours(0);
            startDate.setMinutes(0);
            return startDate;
        }

        var _setEndOfDate = function(endDate) {
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);
            return endDate;
        }

        var getOnlyJuicesOrders = function() {
            delete orders.CTL;
            return orders;
        }

        var getOnlyCTLOrders = function() {
            return {CTL : orders.CTL};
        }
}])