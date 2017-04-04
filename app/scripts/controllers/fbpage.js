/* global angular, app */

app.controller('FbpageCtrl', [
  '$scope', '$rootScope', '$routeParams', '$location', 'Email', '$http', '$cookies','$sce',
  function($scope, $rootScope, $routeParams, $location, Email, $http, $cookies, $sce) {

    $scope.panelVisibility = 'mobile';
    $scope.getPayloadUrl = function() {
      return $scope.payload ? $sce.trustAsResourceUrl($scope.payload.message.attachment.payload.url) : null;
    };

    const getPayloadType = (p) => {
      if (p.message) {
        if (p.message.text) return 'text';

        if (p.message.attachment && p.message.attachment.type == 'template') {
          const types = {
            'generic': 'template_generic'
          }
          const type = types[p.message.attachment.payload.template_type];
          if (type) return type;
        }

        if (p.message.attachment && p.message.attachment.type == 'image') return 'image';
        if (p.message.attachment && p.message.attachment.type == 'audio') return 'audio';
        if (p.message.attachment && p.message.attachment.type == 'video') return 'video';
      }

      return 'unknown';
    }

    // Get the item data by route parameter
    var getItem = function() {

      Email.get({ id: $routeParams.itemId }, function(email) {

        $scope.item = email;
        $scope.payload = JSON.parse(email.headers['x-payload']);
        $scope.app = JSON.parse(email.headers['x-app']);
        $scope.displayType = getPayloadType($scope.payload);

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
