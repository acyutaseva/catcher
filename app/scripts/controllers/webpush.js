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
        $scope.payloadSrc = JSON.parse(email.headers['x-payload']);
        $scope.payload = Object.assign({}, {
          data: {
            events: email.headers['x-events'] ? JSON.parse(email.headers['x-events']) : {},
            payload: $scope.payloadSrc
          }
        }, $scope.payloadSrc);
        if ($scope.payload.data.events.open) fetch($scope.payload.data.events.open, {method: 'POST'});

      }, function(error) {
        console.error('404: Email not found');
        $location.path('/');
      });
    };

    function preview() {
      navigator.serviceWorker.register('sw.js');
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification($scope.payload.title, $scope.payload);
      });
    }

    function play() {
      const perm = Notification.permission;
      if (perm === 'denied') {
        alert('You must unlock Notification on Chrome Settings (!! not working on private navigation)');
      } else if (perm === 'granted') {
        preview();
      } else {
        Notification.requestPermission().then(play);
      }
    }

    $scope.play = play;

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
