/* global angular, app */

app.controller('FbpageCtrl', [
  '$scope', '$rootScope', '$routeParams', '$location', 'Email', '$http', '$cookies','$sce',
  function($scope, $rootScope, $routeParams, $location, Email, $http, $cookies, $sce) {

    $scope.panelVisibility = 'mobile';
    $scope.getPayloadUrl = function() {
      return ($scope.payload && $scope.payload.message && $scope.payload.message.attachment && $scope.payload.message.attachment.payload) ?
        $sce.trustAsResourceUrl($scope.payload.message.attachment.payload.url) : null;
    };

    const getPayloadType = (p) => {
      if (p.message) {
        if (p.message.text) return 'text';

        if (p.message.attachment && p.message.attachment.type === 'template') {
          const types = {
            'generic': 'template_generic',
            'button': 'template_button'
          };
          const type = types[p.message.attachment.payload.template_type]; // jshint ignore:line
          if (type) return type;
        }

        if (p.message.attachment && p.message.attachment.type === 'image') return 'image';
        if (p.message.attachment && p.message.attachment.type === 'audio') return 'audio';
        if (p.message.attachment && p.message.attachment.type === 'video') return 'video';
      }

      return 'unknown';
    };

    // Get the item data by route parameter
    var getItem = function() {

      Email.read($routeParams.itemId, function(email) {

        $scope.item = email;
        $scope.payload = JSON.parse(email.headers['x-payload']);
        $scope.app = JSON.parse(email.headers['x-app']);
        $scope.displayType = getPayloadType($scope.payload);

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
