/* global angular, app */

/**
 * Email item Controller -- The UI for the email pane
 */

app.controller('WebpushCtrl', [
  '$scope', '$rootScope', '$routeParams', '$location', 'Email', '$http', '$cookies',
  function($scope, $rootScope, $routeParams, $location, Email, $http, $cookies) {

    $scope.panelVisibility = 'desktop';

    // Get the item data by route parameter
    var getItem = function() {

      Email.get({ id: $routeParams.itemId }, function(email) {

        console.log(email);
        $scope.item = email;
        $scope.payload = JSON.parse(email.headers['x-payload']);

      }, function(error) {
        console.error('404: Email not found');
        $location.path('/');
      });
    };


    // Toggle what format is viewable
    $scope.show = function(type) {
      if ((type === 'html' || type === 'attachments') && !$scope.item[type]) return;

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
