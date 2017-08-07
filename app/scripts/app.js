/* global angular, io, location */

/**
 * App Config
 */

var app = angular.module('mailDevApp', ['ngRoute', 'ngResource', 'ngSanitize', 'ngCookies'])

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
    .when('/info', { templateUrl: 'views/info.html', controller: 'MainCtrl' })
    .when('/email/:itemId', { templateUrl: 'views/item.html', controller: 'ItemCtrl' })
    .when('/webpush/:itemId', { templateUrl: 'views/webpush.html', controller: 'WebpushCtrl' })
    .when('/fbpage/:itemId', { templateUrl: 'views/fbpage.html', controller: 'FbpageCtrl' })
    .when('/sms/:itemId', { templateUrl: 'views/sms.html', controller: 'SmsCtrl' })
    .when('/push/:itemId', { templateUrl: 'views/push.html', controller: 'PushCtrl' })
    .otherwise({ redirectTo: '/' })
}])

app.run(['$rootScope', function ($rootScope) {
  // Connect Socket.io
  var socket = io({
    path: location.pathname + 'socket.io'
  })

  socket.on('newMail', function (data) {
    $rootScope.$emit('newMail', data)
  })

  socket.on('deleteMail', function (data) {
    $rootScope.$emit('deleteMail', data)
  })

  $rootScope.$on('Refresh', function () {
    console.log('Refresh event called.')
  })
}])

/**
 * NewLineFilter -- Converts new line characters to br tags
 */

app.filter('newLines', function () {
  return function (text) {
    return text ? text.replace(/\n/g, '<br>') : ''
  }
});

app.filter('debug', () => (e) => {
  console.log(e);
  return  '';
});

app.filter('url_hostname', () => (e) => (new URL(e)).hostname);

/**
 * Sidebar scrollbar fixed height
 */

(function () {
  var sidebar = document.querySelector('.sidebar')
  var sidebarHeader = document.querySelector('.sidebar-header')
  var emailList = document.querySelector('.email-list')
  var sidebarHeaderHeight = sidebarHeader.getBoundingClientRect().height
  var resizeTimeout = null

  function adjustEmailListHeight () {
    var newEmailListHeight = sidebar.getBoundingClientRect().height - sidebarHeaderHeight
    emailList.style.height = newEmailListHeight + 'px'
  }

  adjustEmailListHeight()

  window.onresize = function () {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }
    resizeTimeout = window.setTimeout(function () {
      adjustEmailListHeight()
      resizeTimeout = null
    }, 300)
  }
})()
