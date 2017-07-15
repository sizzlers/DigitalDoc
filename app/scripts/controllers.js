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
          $state.go('locator');
    },
    selfie : function() {

    },

  }
})


.controller('LocatorController', function($scope, BeaconManagerService) {



  $scope.saved = BeaconManagerService.get('locator');
  $scope.locator = (BeaconManagerService.get('locator')!==null) ? JSON.parse($scope.saved) : [ {text: 'test', visited: false}];
  BeaconManagerService.set('locator', JSON.stringify($scope.locator));

  /*$scope.save = function() {

        var locArr = $scope.locator;
        angular.forEach(locArr, function(data){
            if(locArr.indexOf(data.text) !== $scope.txt1){
              $scope.locator.push({
                text: $scope.txt1,
                visited: true
                });
            }
          });


        BeaconManagerService.set('locator', JSON.stringify($scope.locator));

}*/

  $scope.clear = function() {

    //$scope.data = storageService.get('1')

     BeaconManagerService.remove();

      }
});
