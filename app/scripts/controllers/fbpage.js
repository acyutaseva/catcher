/* global angular, app */

app.controller('FbpageCtrl', [
  '$scope', '$rootScope', '$routeParams', '$location', 'Email', '$http', '$cookies',
  function($scope, $rootScope, $routeParams, $location, Email, $http, $cookies) {

    $scope.panelVisibility = 'mobile';

    // Get the item data by route parameter
    var getItem = function() {

      Email.get({ id: $routeParams.itemId }, function(email) {

        console.log(email);
        $scope.item = email;
        $scope.payload = JSON.parse(email.headers['x-payload']);
        $scope.app = JSON.parse(email.headers['x-app']);

      }, function(error) {
        console.error('404: Email not found');
        $location.path('/');
      });
    };

    function preview() {
      console.log($scope.payload);
      new Notification($scope.payload.title, {
        body: $scope.payload.content
      })
    }

    // Toggle what format is viewable
    $scope.show = function(type) {
      $scope.panelVisibility = type;
    };

    // Sends a DELETE request to the server
    $scope.delete = function(item) {

      Email.delete({ id: item.id });
    };

    // Initialize the view by getting the email
    getItem();
  }
]);
