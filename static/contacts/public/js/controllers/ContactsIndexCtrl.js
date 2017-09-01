app.controller("ContactsIndexCtrl", function($scope, $location, Contact) {
  console.log("here");
  $scope.contacts = Contact.index();
  $scope.search = function() {
    $location.path("/contacts/new");
  };
  $scope.new = function() {
    $location.path("/contacts/new");
  };

});