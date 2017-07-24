angular.module('starter.controllers', [])

  .controller('FixturesCtrl', function($scope, DetailsService) {
    $scope.fixtures = [];

    function init() {
      DetailsService.getFixtures().then(
        function(results) {
          $scope.fixtures = results.fixtures;
        },
        function(reason) {
          alert('Error');
        }
      );
    }
    init();

  })

  .controller('PlayersCtrl', function($scope, DetailsService) {
    $scope.players = [];

    function init() {
      DetailsService.getPlayerDetails().then(
        function(results) {
          $scope.players = results.players;
        },
        function(reason) {
          alert('Error');
        }
      );
    }
    init();
  })


  .controller('HighlightsCtrl', function($scope, DetailsService, $sce, lodash) {
    $scope.videos = [];

    function init() {
      DetailsService.getVideos().then(
        function(results) {
          $scope.videos = results.videos;
          sanitizeVideoURL();
        },
        function(reason) {
          alert('Error');
        }
      );
    }

    function sanitizeVideoURL() {
      lodash.each($scope.videos, function(video, index) {
        //$scope.videos[index].url = $scope.videos[index].url+'&output=embed'
        $scope.videos[index].url = $sce.trustAsResourceUrl(video.url);

      });
    }

    init();
  })

  .controller('WelcomeController', function($scope, $state, RegistrationService) {
    $scope.register = {
      name: '',
      save: function() {
        RegistrationService.saveUser($scope.register.name);
        $state.go('dashboard');
      }
    }

  })

  .controller('SelfieController', function($scope, $ionicPlatform) {
    function init() {
      $ionicPlatform.ready(function() {
        initializeEzAR();

      });

      updateHeading(0);
    }

    //init();

    function updateHeading(hdng) {
      // Set heading value
      //document.getElementById("heading-val").innerHTML = hdng;
      // Rotate compass star
      // document.getElementById("compass-star").style.webkitTransform = "rotate(" + hdng + "deg)";
    }

    function updateAppLayout() {
      //document.getElementsByClassName("compass-outer")[0].style.height = window.innerHeight + "px";
    }

    function initializeEzAR() {
      updateAppLayout();

      ezar.initializeVideoOverlay(
        function() {
          ezar.getFrontCamera().start();

          //watchHeading() async update randomly stops on ios and android
          // use getCurrentHeading() as more reliable alternative


        },
        function(error) {
          console.log("Error initializing ezAR: " + error);
        });

      window.addEventListener("resize", function() {
        app.updateAppLayout();
      });
      /*document.getElementById("snapbtn").addEventListener("click", function() {
          app.doSnapshot();
      });*/

    }



  })


  .controller('ArController', function($scope) {
    function init() {


      var video = document.createElement('video');

      //document.body.appendChild(video);
      angular.element(document.getElementById('arcamera')).append(video);

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      //  var tw = 1280 / 2;
      //var th = 720 / 2;

      var hdConstraints = {
        audio: false,
        video: {

        }
      };

      if (navigator.getUserMedia) {
        navigator.getUserMedia(hdConstraints, success, errorCallback);
      } else {
        errorCallback('');
      }

      function errorCallback(e) {
        console.log("Can't access user media", e);
      }


      function success(stream) {
        console.log('success', stream);
        video.src = window.URL.createObjectURL(stream);
        video.onclick = function() {
          video.play();
        };
        video.play();

        var cameraParam = new ARCameraParam();
        cameraParam.onload = function() {

          var arController;

          var interval = setInterval(function() {
            if (!video.videoWidth) return;

            if (!arController) {
              arController = new ARController(video, cameraParam);
              arController.debugSetup();
            }

            arController.process();
          }, 16);


        };
        cameraParam.src = 'images/camera_para.dat';
      }
    }

    init();
  })

  .controller('DashboardController', function($scope, $state, $ionicHistory, menuValue) {
    $scope.dashboard = {

      go: function(state) {
        $state.go(state);
      },
      menus: menuValue.menus,
      video: function() {
        $state.go('tab.fixtures');
      },
      ar: function() {
        $state.go('ar');
      },
      locator: function() {
        $state.go('locator');
      },
      selfie: function() {

      }



    }

    function successCallback(data) {
      console.log('successCallback', data);
    }

    function errorCallback(error) {
      console.log('errorCallback', error);
    }
    $scope.test = function() {
      menuValue.menus[2].canShow = true;
    }

    function init() {
      $ionicHistory.clearHistory();
    }

    init();
  })


  .controller('LocatorController', function($scope, BeaconManagerService, beaconValue, beaconsConstant, $cordovaLocalNotification) {

    $scope.locator = {
      visitedBeacons: beaconValue.visitedBeaconsValue,
      rooms: beaconsConstant.beacons
    }

    function init() {
      BeaconManagerService.getVisitedBeacons();
      console.log('Suresh ', beaconValue.visitedBeaconsValue);

    }
    init();

    $scope.save = function() {
      /*var data = {
        beaconName:'Room 1',
        beaconIdentifier:'HRE3-K56ZX'
      }
      //data.beaconIdentifier = Math.floor((Math.random()*6)+1);
      BeaconManagerService.storeVisitedBeacons(data);*/
      /*$cordovaLocalNotification.schedule({
          id: 1,
          title: 'Title here',
          text: 'Text here',
          icon: "res://screen.png",
          data: {
            customProperty: 'custom value'
          }
        }).then(function (result) {

        });*/

    }

    $scope.clear = function() {

      //$scope.data = storageService.get('1')
      BeaconManagerService.clearVisitedBeacons();

    }
  });
