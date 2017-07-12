angular.module('starter.controllers', [])

.controller('FixturesCtrl', function($scope) {


})

.controller('PlayersCtrl', function($scope) {

})


.controller('HighlightsCtrl', function($scope) {

})

.controller('DashboardController', function($scope, $state) {
  $scope.go = {
    video : function() {
        $state.go('tab.fixtures');
    },
    ar : function() {

    },
    locator : function() {

    },
    selfie : function() {

    },

  }
});
