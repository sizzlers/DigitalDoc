angular.module('starter.services', ['ngLodash'])

  .factory('BeaconManagerService', function(lodash, beaconValue, beaconsConstant) {


    function storeVisitedBeacons(data1) {


      var blnStatus = false;
      angular.forEach(beaconValue.visitedBeaconsValue, function(data, index) {
        if (data.beaconIdentifier === data1.beaconIdentifier) {
          //blnStatus = true;
          beaconValue.visitedBeaconsValue[index].visited = true;
        }
      });


      localStorage.setItem('locator', JSON.stringify(beaconValue.visitedBeaconsValue));

    }

    function getVisitedBeacons() {
      var storage = localStorage.getItem('locator');
      if (storage) {
        beaconValue.visitedBeaconsValue = JSON.parse(storage);
      }

    }

    function clearVisitedBeacons() {
      localStorage.removeItem('locator');
      beaconValue.visitedBeaconsValue = beaconsConstant.beacons;
    }

    return {
      storeVisitedBeacons: storeVisitedBeacons,
      getVisitedBeacons: getVisitedBeacons,
      clearVisitedBeacons: clearVisitedBeacons

    };
  })
  .factory('RegistrationService', function() {
    function saveUser(name) {
      localStorage.setItem('user', name);
    }

    function getUser() {
      return localStorage.getItem('user');
    }

    return {
      saveUser: saveUser,
      getUser: getUser

    };
  })


  .factory('LocationBeaconService', function($state, lodash, beaconValue, beaconsConstant, $cordovaLocalNotification) {

    function notifyUser(data) {
      if (checkLocationBasedBeacon(data)) {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'Europa League 2017',
          text: 'Man united won the Europa League 2017 cup and you are visiting that. Want to see more details!!! Tap here !!',
          data: {
            beaconName: data.beaconName,
            beaconIdentifier: data.beaconIdentifier
          }
        });
      }

    }

    function checkLocationBasedBeacon(data) {
      var status = false;
      lodash.each(beaconValue.visitedBeaconsValue, function(beaVal, index) {
        if (beaVal.beaconIdentifier === data.beaconIdentifier && beaVal.beaconPlace === 'location' && !beaVal.isNotified) {
          beaconValue.visitedBeaconsValue[index].isNotified = true;
          status = true;
        }
      });

      return status;
    }

    function handleNotification(data) {
      $state.go('tab.highlights');
    }

    return {
      notifyUser: notifyUser,
      handleNotification: handleNotification

    };
  })


  .factory('MenuService', function($state, lodash, menuValue) {

    function updateMenu(data) {
      lodash.each(menuValue.menus, function(menu, index) {
        if (menu.beaconIdentifier === data.beaconIdentifier) {
          menuValue.menus[index].canShow = true;
        }
      });

    }

    return {
      updateMenu: updateMenu

    };
  })

  .factory('DetailsService', function($q, $http) {

    function getFixtures() {
      var deferred = $q.defer();
      $http.get('./data/fix.json').then(
        function(result) {
          console.log(result);
          deferred.resolve(result.data);
        },
        function() {
          deferred.reject('Error');
        }
      );
      return deferred.promise;
    }

    function getPlayerDetails() {
      var deferred = $q.defer();
      $http.get('./data/players.json').then(
        function(result) {
          deferred.resolve(result.data);
        },
        function() {
          deferred.resolve('Error');
        }
      );
      return deferred.promise;
    }

    function getVideos() {
      var deferred = $q.defer();
      $http.get('./data/videos.json').then(
        function(result) {
          deferred.resolve(result.data);
        },
        function() {
          deferred.resolve('Error');
        }
      );
      return deferred.promise;
    }

    return {
      getFixtures: getFixtures,
      getPlayerDetails: getPlayerDetails,
      getVideos: getVideos

    };
  })
