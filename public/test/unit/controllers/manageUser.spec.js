describe("usersControllerTest", function() {
    var scope, mongooseService;

    beforeEach(function() {
        module('adjuvant')
    })

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        $controller('usersController', {$scope: scope});

        scope.$digest();
    }))


    it("should set the respective form on setting the a tab", function() {
        var selection = {action: "add"}
        scope.setSelectedTab(selection);

        expect(scope.addUserForm).to.be.true
        expect(scope.flushAndUpdateDB).to.be.false
    })


    it("should change the tabs object based on the scope variables", function() {
        var expectedTabs = [{name: "Add a user", action: "add", isActive: false},
                            {name:"Update DB From a file", action: "flushAndUpdateDB", isActive: false},
                            {name:"Find/Update/Delete User", action: "findUpdateDeleteUser", isActive: true},
                             {name:"Authenticate User", action: "authenticateUser", isActive: false},
                             {name:"All Users", action: "allUsers", isActive: false}]
        var selection = {action: "findUpdateDeleteUser"}
        scope.setSelectedTab(selection);

        expect(scope.tabs).to.be.eql(expectedTabs)
    })
})