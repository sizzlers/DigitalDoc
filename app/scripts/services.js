angular.module('starter.services', [])

.factory('BeaconManagerService', function() {


  function storeVisitedBeacons(data1){

    var beacons = {
      name: '',
      visited: false
    }

    var locArr = localStorage.getItem('locator') | [];

		var blnStatus = false;
		angular.forEach(locArr, function(data)
		{
				if(data.text === data1){
					   blnStatus = true;

				}
		});

				if(!blnStatus)
				{
						beacons.name=data1,
            beacons.visited=true
            locArr.push(beacons);

				}
    localStorage.setItem('locator', locArr);
  }
  return {
      get: function(key) {
          return localStorage.getItem(key);
      },
      set: function(key, data) {
          localStorage.setItem(key, data);
      },

      storeVisitedBeacons: storeVisitedBeacons,
      remove:function(){
      localStorage.clear();
      }
  };
});
