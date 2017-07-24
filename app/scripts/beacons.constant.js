angular.module('starter.constants', [])


  .constant('beaconsConstant', {
    beacons: [{
        beaconName: 'Room 1',
        beaconIdentifier: 'HRE3-K56ZX'
      },
      {
        beaconName: 'Room 2',
        beaconIdentifier: 'XYCT-173PP',
        beaconPlace: 'location'
      },
      {
        beaconName: 'Room 3',
        beaconIdentifier: 'JG85-88S5B',
        beaconPlace: 'selfie'
      },
      {
        beaconName: 'Room 4',
        beaconIdentifier: 'AS22-K55ZX'
      }

    ]

  })


  .constant('menuConstant', {
    menus: [{
        menuName: 'Locator',
        menuImg: 'images/locator.png',
        menuState: 'locator',
        beaconIdentifier: '',
        canShow: true
      },
      {
        menuName: 'AR Video',
        menuImg: 'images/ar.png',
        menuState: 'ar',
        beaconIdentifier: '',
        canShow: true
      },

      {
        menuName: 'Moments',
        menuImg: 'images/selfie.png',
        menuState: 'tab.highlights',
        beaconIdentifier: 'HRE3-K56ZX',
        canShow: true
      },
      {
        menuName: 'Virtual Interview',
        menuImg: 'images/interview.png',
        menuState: 'interview',
        beaconIdentifier: '',
        canShow: true
      },
      {
        menuName: 'Selfie',
        menuImg: 'images/selfie.png',
        menuState: 'selfie',
        beaconIdentifier: 'XYCT-173PP',
        canShow: false
      }

    ]

  });
