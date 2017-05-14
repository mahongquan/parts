'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ["ngResource"]).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when("/contacts", { templateUrl: "/static/contacts/views/partials/index.html", controller: "ContactsIndexCtrl" })
      .when("/contacts/new", { templateUrl: "/static/contacts/views/partials/edit.html", controller: "ContactsEditCtrl" })
      .when("/contacts/:id", { templateUrl: "/static/contacts/views/partials/show.html", controller: "ContactsShowCtrl" })
      .when("/contacts/:id/delete", { templateUrl: "/static/contacts/views/partials/delete.html", controller: "ContactsDeleteCtrl" })
      .when("/contacts/:id/edit", { templateUrl: "/static/contacts/views/partials/edit.html", controller: "ContactsDeleteCtrl" })
      .otherwise({ redirectTo: "/contacts" });
  }]);
app.config(['$httpProvider', function($httpProvider) {
    //$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    //$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post['X-CSRFToken']=global_token;
}]);
// app.run( function run( $http, $cookies ){

//     // For CSRF token compatibility with Django
//     $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
// })