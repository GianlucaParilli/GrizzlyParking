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


const timestamp = firebase.firestore.FieldValue.serverTimestamp();
var userID = "test@ggc.edu";
var userParked = new Observable<boolean>();

@Component({
  selector: 'page-h-Lot',
  templateUrl: 'h-Lot.html'
})
export class HLotPage {
  
  private latNumber: number;
  private longNumber: number;
  //private userID: string = "test@ggc.edu";
  private locationName: string = "6tfeIg9EKNYWLLumamoL";
  private parkingLotName: string = "h-Lot";
  isHlotCrossed: any;

  //let longString;

  // OBSERVABLES
  userObs: Observable<UserInterface>;
  locationObs: Observable<LocationInterface[]>;
  parkingLotObs: Observable<ParkingLotInterface[]>;
  hLotObs: Observable<ParkingLotInterface>;

  // COLLECTION REFERENCES
  userCollectionRef: AngularFirestoreCollection<UserInterface>;
  locationCollectionRef: AngularFirestoreCollection<LocationInterface>;
  parkingLotCollectionRef: AngularFirestoreCollection<ParkingLotInterface>;

  // DOCUMENT REFERENCES
  userDocumentRef: AngularFirestoreDocument<UserInterface>;
  locationDocumentRef: AngularFirestoreDocument<LocationInterface>;
  hLotDocumentRef: AngularFirestoreDocument<ParkingLotInterface>;


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

    // FIREBASE CONNECTION TO DOCUMENTS
    firebase.firestore().collection('/user').get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().email === firebase.auth().currentUser.email) {
          userID = doc.id;
          userParked = doc.data().isParked;

          console.log('fetchUser.email: ', doc.data().email,
            '\nfetchUser.isParked: ', doc.data().isParked);
        }
      })
      this.userDocumentRef = this.afs.collection('user').doc(userID);
    })

    //console.log('userID:', this.userID);

    // FIREBASE CONNECTION TO DOCUMENTS
    this.locationDocumentRef = this.afs.collection('location').doc('none');
    this.hLotDocumentRef = this.afs.collection('parkingLot').doc('h-Lot');

    // OBSERVABLE LISTENERS
    //this.locationObs = this.locationCollectionRef.valueChanges();
    //this.parkingLotObs = this.parkingLotCollectionRef.valueChanges();
    //this.hLotObs = this.hLotDocumentRef.valueChanges();

    this._locationService.getData.subscribe((entered) => {
      this.isHlotCrossed = entered;

      if (this.isHlotCrossed) {
        console.log('crossed enter');
        this.parkedConfirmation();
      }
      else if (this.isHlotCrossed == false) {
        console.log('crossed exit');
        this.unparkUser();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad hLotPage');
  }

  //userDocRefID: firebase.firestore.DocumentReference = firebase.firestore().collection('/user').doc(this.userID);
  locationDocRefID: firebase.firestore.DocumentReference = firebase.firestore().collection('/location').doc(this.locationName);
  parkingLotDocRefID: firebase.firestore.DocumentReference = firebase.firestore().collection('/parkingLot').doc(this.parkingLotName);

  ngAfterViewInit() {
    this.userDocumentRef = this.afs.collection('user').doc(userID);
    this.userObs = this.userDocumentRef.valueChanges();
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
    this.parkUser();

    let carInLot = setTimeout(() => {
      console.log('time out ended ')
      this.showMarker();
    }, TIME_IN_MS);
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
    console.log("~~~~~~~~~~ FUNCTION parkUser called ", userID);

    /*
    // We must first check to see if the user is already parked or not
    // TRUE - User is pasked
    //        A parked user cannot park again...
    //        REALISTICALLY, user should be prompted. Then reparked...
    // FALSE - User is not parked and ready to use this function!
    if (!this.userObs.isParked) {
      let toast = this._toastCtrl.create({
        message: 'PARK FAILED\nYou are already parked',
        duration: 3000,
        position: 'middle'
      });
    }
    */

    //this.userDocRefID = firebase.firestore().collection('/user').doc(this.userID);
    //this.userDocumentRef = this.afs.collection('user').doc(this.userID);

    var factor = Math.pow(10, 8);
    var myLat = this._locationService.lat;
    var myLng = this._locationService.lng;

    if (myLat != 0) {
      myLat = Math.round(myLat * factor) / factor
    }

    this.createLocation(myLat, myLng);
    this.calcParkingLot();

    /*
    console.log("~~~~~~~~~~ FUNCTION unparkUser to: true, ", 
       "\nCALC: ", this.locationDocRefID, ' ?==? USING: ', this.locationDocumentRef.ref,
       "\nCALC: ", this.parkingLotDocRefID, ' ?==? EXPECT: /parkingLot/h-lot');
    */

    this.userDocumentRef.update({
      isParked: true,
      parkedLocation: this.locationDocRefID,
      parkedLot: this.parkingLotDocRefID,
      parkedTime: timestamp
    }).then(result => {
      this.updateParkingLotPopulation(1);
    }).catch(function (error) {
      console.log("~~~~~~~~~~ FUNCTION parkUser error ", error);
    });
  }

  unparkUser() {
    console.log("~~~~~~~~~~ FUNCTION unparkUser called ", this.userDocumentRef);

    /*
    // We must first check to see if the user is already parked or not
    // TRUE - User is pasked
    //        A parked user cannot park again...
    //        REALISTICALLY, user should be prompted. Then reparked...
    // FALSE - User is not parked and ready to use this function!
    if (!this.userObs.isParked) {
      let toast = this._toastCtrl.create({
        message: 'UNPARK FAILED\nYou are not currently parked',
        duration: 3000,
        position: 'middle'
      });
      toast.onDidDismiss(() => {
        console.log('~~~~~~~~~~ FUNCTION unparkUser Dismissed toast');
      });
      toast.present();
    }
    */

    this.deleteLocation();
    
    console.log("~~~~~~~~~~ FUNCTION unparkUser to: false & ", this.locationDocRefID);

    this.userDocumentRef.update({
      isParked: false,
      parkedLocation: this.locationDocRefID, //'/location/none',
    }).then(result => {
      this.updateParkingLotPopulation(-1);
    }).catch(function (error) {
      console.log("~~~~~~~~~~ FUNCTION unparkUser error ", error);
    });
  }


  // COLLECTION FUNCTIONS  |  LOCATION
  // CREATE LOCATION - called by parkUser()
  createLocation(lat: number, long: number) {
    console.log("~~~~~~~~~~ FUNCTION createLocation called ", this.locationDocumentRef);

    if (lat != 0 && long != 0) {
      this.locationCollectionRef.add({
        lat: lat,
        long: long
      }).then(result => {
        console.log("~~~~~~~~~~ FUNCTION createLocation successful - ID: ", result.id);

        this.locationName = result.id
        this.locationDocRefID = firebase.firestore().collection('/location').doc(this.locationName);
        //return this.locationDocRefID;
      }).catch(function (error) {
        console.error("~~~~~~~~~~ FUNCTION createLocation error ", error);
      });
    }

    //return this.locationDocRefID;  //firebase.firestore().collection('/location').doc('/none');
  }

  // DELETE LOCATION - called by unparkUser()
  deleteLocation() {
    console.log("~~~~~~~~~~ FUNCTION deleteLocation called");

    if (this.locationName != "none") {
      this.locationCollectionRef.doc(this.locationName).delete().then(function () {
        console.log("~~~~~~~~~~ FUNCTION deleteLocation successful");

        this.locationName = "none";
        this.locationDocRefID = firebase.firestore().collection('/location').doc(this.locationName);
      }).catch(function (error) {
        console.log("~~~~~~~~~~ FUNCTION deleteLocation error ", error);
      });
    }

    //return this.locationDocRefID;  //firebase.firestore().collection('/location').doc(this.locationName);
  }


  // COLLECTION FUNCTIONS  |  PARKINGLOT
  calcParkingLot() {
    console.log("~~~~~~~~~~ FUNCTION calcParkingLot called");

    // figure out the lot...
    // this should be based on distance the user is from the center point of the parking lolt.
    // we need to know parking lot radius...
    // luca said he was going to work on this, but pretty set on geofense still ()
    this.parkingLotName = "h-Lot";
    this.parkingLotDocRefID = firebase.firestore().collection('/parkingLot').doc(this.parkingLotName);
    return //this.parkingLotDocRefID;
  }

  updateParkingLotPopulation(change: number) {
    console.log("~~~~~~~~~~ FUNCTION updateParkingLotPopulation called");

    var parkingLot = this.afs.collection('parkingLot').doc('h-Lot').ref;

    this.afs.firestore.runTransaction(function (transaction) {
      return transaction.get(parkingLot).then(function (doc) {
        if (!doc.exists) {
          throw "Document does not exist!";
        }

        // Adjust parkinglot stats from park/unpark function
        var newPopulation = doc.data().plPopulation + change;
        var newFullPct = 100 - Math.round((newPopulation / doc.data().plCapacity) * 100.00);
        var newAvailPct = 100 - Math.round((newPopulation / doc.data().plCapacity) * 100.00);
        transaction.update(parkingLot, { plPopulation: newPopulation, plAvailablePct: newAvailPct, plFullPct: newFullPct });

        // determine whether status (for card color) should be updated
        // TRUE - update, FALSE - nothing, no else
        var newStatus = (newFullPct >= 50 ? "secondary" : (newFullPct >= 25 ? "caution" : "danger"));
        if (newStatus != doc.data().status) {
          transaction.update(parkingLot, { status: newStatus });
        }
      });
    }).then(result => {
      console.log('~~~~~~~~~~ FUNCTION updateParkingLotPopulation Transaction success!');
    }).catch(function (error) {
      console.log('~~~~~~~~~~ FUNCTION updateParkingLotPopulation Transaction failure:', error);
    });
  }

}
