/* global angular, app */

/**
 * Email item Controller -- The UI for the email pane
 */

app.controller('PushCtrl', [
  '$scope', '$rootScope', '$routeParams', '$location', 'Email', '$http', '$cookies',
  function($scope, $rootScope, $routeParams, $location, Email, $http, $cookies) {

    $scope.panelVisibility = 'mobile';

    // Get the item data by route parameter
    var getItem = function() {

      Email.read($routeParams.itemId, function(email) {

        $scope.item = email;
        $scope.payloadSrc = JSON.parse(email.headers['x-payload']);
        $scope.payload = Object.assign({}, {
          data: {
            events: email.headers['x-events'] ? JSON.parse(email.headers['x-events']) : {},
            payload: $scope.payloadSrc
          }
        }, $scope.payloadSrc);

      }, function(error) {
        console.error('404: Email not found');
        $location.path('/');
      });
    };

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
