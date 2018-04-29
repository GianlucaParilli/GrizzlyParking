import {
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  NavController,
  Platform,
  AlertController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker,
  MarkerOptions
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocationtrackerProvider } from '../../providers/locationtracker/locationtracker';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import {
  UserInterface,
  LocationInterface,
  ParkingLotInterface
} from "../../shared/models/collections";
import { version } from 'punycode';


const timestamp = firebase.firestore.FieldValue.serverTimestamp();

@Component({
  selector: 'page-h-Lot',
  templateUrl: 'h-Lot.html'
})
export class HLotPage {
  private latNumber: number;
  private longNumber: number;
  isParked: boolean;
  isHlotCrossed: any;

  //let longString;

  // OBSERVABLES
  userObs: Observable<UserInterface>;
  locationsObs: Observable<LocationInterface[]>;
  parkingLotsObs: Observable<ParkingLotInterface[]>;
  plObs: Observable<ParkingLotInterface>;

  // COLLECTION REFERENCES
  userCollectionRef: AngularFirestoreCollection<UserInterface>;
  locationCollectionRef: AngularFirestoreCollection<LocationInterface>;
  parkingLotCollectionRef: AngularFirestoreCollection<ParkingLotInterface>;

  // DOCUMENT REFERENCES
  userDocumentRef: AngularFirestoreDocument<UserInterface>;
  locationDocumentRef: AngularFirestoreDocument<LocationInterface>;
  plDocumentRef: AngularFirestoreDocument<ParkingLotInterface>;


  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _googleMaps: GoogleMaps,
    private _geoLocation: Geolocation,
    private _toastCtrl: ToastController,
    public _locationService: LocationtrackerProvider,
    public _platform: Platform,
    public _local: LocalNotifications,
    public alertCtrl: AlertController,
    private afs: AngularFirestore,
  ) {
    // FIREBASE CONNECTION TO COLLECTIONS
    this.userCollectionRef = this.afs.collection('user');
    this.locationCollectionRef = this.afs.collection('location');
    this.parkingLotCollectionRef = this.afs.collection('parkingLot');

    // FIREBASE CONNECTION TO H-LOT
    this.setParkingLot('h-Lot');

    console.log(firebase.auth().currentUser.email);
    // FIREBASE CONNECTION TO USER
    this.calcUser(firebase.auth().currentUser.email).then(result => {
      console.log('USER INITIALIZED');
    })
  }



  calcUser(userEmail: string) {
    var userQuery = firebase.firestore().collection('/user').where('email', '==', userEmail);
    var promise = new Promise<boolean>(resolve => {
      return userQuery.get().then(querysnapshot => {
        var result = querysnapshot.docs.pop();
        console.log('USER: ', result.data());
        return this.setUser(result.id);
      }).then(result => {
        return this.setObs();
      }).then(result => {
        return this.getUserStatus();
      })
    });
    return promise;
  }

  setUser(userID: string) {
    var promise = new Promise<boolean>(resolve => {
      this.userDocumentRef = this.afs.collection('user').doc(userID);
      console.log('SET USER: ', this.userDocumentRef.ref.path);
      resolve(true);
    });
    return promise;
  }

  getUserStatus() {
    var promise = new Promise<boolean>(resolve => {
      return this.userDocumentRef.ref.get().then(result => {
        console.log('GET USER LOCATION: ', result.data().parkedLocation.id);
        return this.setLocation(result.data().parkedLocation.id);
        //return result.data().isParked;
      }).then(result => {
        console.log('GET USER ISPARKED: ', result);
        return this.setParkedStatus(result);
      })
    });
    return promise;
  }

  setParkedStatus(bool: boolean) {
    var promise = new Promise<boolean>(resolve => {
      this.isParked = bool;
      console.log('SET HLOTPAGE ISPARKED: ', bool);
      resolve(true);
    });
    return promise;
  }

  setLocation(locID: string) {
    var promise = new Promise<boolean>(resolve => {
      this.locationDocumentRef = this.afs.collection('location').doc(locID);
      console.log('SET LOCATION: ', locID.toString());
      resolve(true);
    });
    return promise;
  }

  setParkingLot(plID: string) {
    var promise = new Promise<boolean>(resolve => {
      this.plDocumentRef = this.afs.collection('parkingLot').doc(plID.toString());
      console.log('SET PARKINGLOT: ', plID.toString());
      resolve(true);
    });
    return promise;
  }

  setObs() {
    // OBSERVABLE LISTENERS
    var promise = new Promise<boolean>(resolve => {
      this.locationsObs = this.locationCollectionRef.valueChanges();
      this.parkingLotsObs = this.parkingLotCollectionRef.valueChanges();
      this.plObs = this.plDocumentRef.valueChanges();
      console.log('SET OBS CALLED');
      resolve(true);
    });
    return promise;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad hLotPage');
  }

  ngAfterViewInit() {
    this.initMap();
    this.start(); //starts geo location 
    this.newMap();
    //get actual location
    this.getLocation().then(res => {
      //console.log(res.coords.latitude);
    });
  }

  initMap() {
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element);
  }

  newMap() {
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

      let loc: LatLng;
      this.getLocation().then(res => {
        loc = new LatLng(res.coords.latitude, res.coords.longitude);
        //this.tesss = res.coords.latitude;
        this.latNumber = res.coords.latitude;
        this.longNumber = res.coords.longitude;
        this.moveCamera(loc);
        this.showMarker();
        this.createMarker(loc, "My Car").then((marker: Marker) => {
          marker.showInfoWindow();
          console.log('print get Location');
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      });
    });
  }

  createMarker(loc: LatLng, title: string) {
    let markerOptions: MarkerOptions = {
      position: loc,
      title: title
    };
    return this.map.addMarker(markerOptions);
  }

  showMarker() {
    this.map.clear();
    let newLoc = new LatLng(this._locationService.lat, this._locationService.lng);

    this.createMarker(newLoc, 'newMarker Car').then((marker: Marker) => {
      marker.showInfoWindow();
      console.log('print get Location');

      //console.log('print get Location' + loc);
      // presentToast("blah " +latString);

    }).catch(err => {
      console.log(err);
    });
    this.moveCamera(newLoc);

    //this._locationService.startTracking();
    //this.presentToast(this._locationService.lat,this._locationService.lng);
    // this.localNotification(this._locationService.lat,this._locationService.lng);
  }

  getLocation() {
    let currentLOC = this._geoLocation.getCurrentPosition();
    return currentLOC;
  }

  start() {
    this._locationService.startTracking();
  }

  stop() {
    this._locationService.stopTracking();
  }

  moveCamera(loc: LatLng) {
    let options: CameraPosition<LatLng> = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(options)
  }

  parkedConfirmation() {
    let TIME_IN_MS = 60000;
    console.log('time out ');

    if (this.isParked) {
      var promise = new Promise<boolean>(resolve => {
        console.log('!!WARNING!! User is already parked. Calling unpark first. -you are welcome!')
        return this.unparkUser();
      }).then(result => {
        return this.parkUser();
      });
    }
    else {
      var promise = new Promise<boolean>(resolve => {
        return this.parkUser();
      });
    }
    promise.then(result => {
      let carInLot = setTimeout(() => {
        console.log('time out ended ')
        this.showMarker();
      }, TIME_IN_MS);
    });

  }

  pressButtonTest() {
    this.parkedConfirmation();
    this.showToast(this._locationService.isEnterHLot)
  }

  showToast(tempB: boolean) {
    let count = 1;
    this._local.schedule({
      id: 1,
      title: 'Local ILocalNotification Example',
      text: 'entered ' + tempB
    });
    console.log("print pressed button");
  }

  presentToast(lat: number, long: number) {
    let toast = this._toastCtrl.create({
      message: 'latitude: ' + lat + ' Longitude: ' + long,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      //this.stop;
    });
    toast.present();
  }

  localNotification(lat: number, long: number) {
    this._local.schedule({
      id: 1,
      title: 'Local ILocalNotification Example',
      text: 'lat: ' + lat + 'long: ' + long
    });
  }


  // COLLECTION FUNCTIONS  |  USER
  parkUser() {
    console.log("~~~~~ FUNCTION parkUser called ");

    var factor = Math.pow(10, 8);
    var myLat = this._locationService.lat;
    var myLng = this._locationService.lng;

    if (myLat != 0) {
      myLat = Math.round(myLat * factor) / factor
    }
    if (myLng != 0) {
      myLng = Math.round(myLng * factor) / factor
    }

    var promise = new Promise<boolean>(resolve => {
      return this.createLocation(myLat, myLng).then(result => {
        return this.calcParkingLot();
      }).then(result => {
        this.userDocumentRef.ref.update({
          isParked: true,
          parkedLocation: this.locationDocumentRef.ref,
          parkedLot: this.plDocumentRef.ref,
          parkedTime: timestamp
        }).then(result => {
          this.updateParkingLotPopulation(1);
          this.setParkedStatus(true);
          let toast = this._toastCtrl.create({
            message: 'YOU HAVE PARKED',
            duration: 3000,
            position: 'middle'
          });
          toast.onDidDismiss(() => {
            //console.log('~~~~~ FUNCTION parkUser Dismissed toast');
          });
          toast.present();
        }).catch(error => {
          console.log("~~~~~ FUNCTION parkUser error ", error);
        })
      }).then(() => {
        return true;
      })
    });
    return promise;
  }

  unparkUser() {
    console.log("~~~~~ FUNCTION unparkUser called ");
    var promise = new Promise<boolean>(resolve => {
      return this.deleteLocation().then(result => {
        this.userDocumentRef.ref.update({
          isParked: false,
          parkedLocation: this.locationDocumentRef.ref, //'/location/none',
        }).then(result => {
          this.updateParkingLotPopulation(-1);
          this.setParkedStatus(false);
          let toast = this._toastCtrl.create({
            message: 'YOU HAVE LEFT',
            duration: 3000,
            position: 'middle'
          });
          toast.onDidDismiss(() => {
            //console.log('~~~~~ FUNCTION unparkUser Dismissed toast');
          });
          toast.present();
        }).catch(error => {
          console.log("~~~~~ FUNCTION unparkUser error ", error);
        })
      }).then(() => {
        return true;
      })
    });
    return promise;
  }


  // COLLECTION FUNCTIONS  |  LOCATION
  // CREATE LOCATION - called by parkUser()
  createLocation(lat: number, long: number) {
    console.log("~~~~~ FUNCTION createLocation called: Lat ", lat, "  Lng ", long);

    return this.locationCollectionRef.add({
      lat: lat,
      long: long
    }).then(result => {
      console.log("~~~~~ FUNCTION createLocation successful - ID: ", result.id);
      return this.setLocation(result.id);
    }).catch(error => {
      console.error("~~~~~ FUNCTION createLocation error ", error);
      return false;
    });
  }

  // DELETE LOCATION - called by unparkUser()
  deleteLocation() {
    console.log("~~~~~ FUNCTION deleteLocation called", this.locationDocumentRef.ref.id.toString());

    var promise = new Promise<boolean>(resolve => {
      if (this.locationDocumentRef.ref.id != "none") {
        return this.locationDocumentRef.ref.delete().then(() => {
          console.log("~~~~~ FUNCTION deleteLocation successful");
          return this.setLocation('none');
        }).then(result => {
          resolve(true);
        }).catch(error => {
          console.log("~~~~~ FUNCTION deleteLocation error ", error);
        });
      }
      else
        resolve(false);
    });
    return promise;
  }


  // COLLECTION FUNCTIONS  |  PARKINGLOT
  calcParkingLot() {
    console.log("~~~~~ FUNCTION calcParkingLot called");

    // figure out the lot...
    // this should be based on distance the user is from the center point of the parking lolt.
    // we need to know parking lot radius...
    // luca said he was going to work on this, but pretty set on geofense still ()
    return this.setParkingLot('h-Lot');
  }

  updateParkingLotPopulation(change: number) {
    console.log("~~~~~ FUNCTION updateParkingLotPopulation called", this.plDocumentRef.ref.id);

    this.afs.firestore.runTransaction(transaction => {
      return transaction.get(this.plDocumentRef.ref).then(doc => {
        if (!doc.exists) {
          throw "Document does not exist!";
        }

        // Adjust parkinglot stats from park/unpark function
        var newPopulation = doc.data().plPopulation + change;
        var newFullPct = Math.round((newPopulation / doc.data().plCapacity) * 100.00);
        var newAvailPct = 100 - Math.round((newPopulation / doc.data().plCapacity) * 100.00);
        console.log(this.plDocumentRef.ref.id, "-  pop: ", newPopulation, "  Apct: ", newAvailPct, "  Fpct: ", newFullPct);
        transaction.update(this.plDocumentRef.ref, { plPopulation: newPopulation, plAvailablePct: newAvailPct, plFullPct: newFullPct });

        // determine whether status (for card color) should be updated
        // TRUE - update, FALSE - nothing, no else
        var newStatus = (newAvailPct >= 50 ? "secondary" : (newAvailPct >= 25 ? "caution" : "danger"));
        if (newStatus != doc.data().status) {
          console.log('~~~~~ FUNCTION updateParkingLotPopulation: UPDATED STATUS OF ', this.plDocumentRef.ref.id);
          transaction.update(this.plDocumentRef.ref, { status: newStatus });
        }

        console.log('~~~~~ FUNCTION updateParkingLotPopulation: ENDING RESULT FOR ', this.plDocumentRef.ref.id, ', ', this.plDocumentRef.ref);

      });
    }).then(result => {
      console.log('~~~~~ FUNCTION updateParkingLotPopulation Transaction success!');
    }).catch(error => {
      console.log('~~~~~ FUNCTION updateParkingLotPopulation Transaction failure:', error);
    });
  }

}
