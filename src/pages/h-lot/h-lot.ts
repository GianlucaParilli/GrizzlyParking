import {
  Component,
  ViewChild,
  ElementRef,
  Injectable
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
  AngularFireDatabase, 
  AngularFireList,
  AngularFireAction } from 'angularfire2/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import {
  UserInterface,
  LocationInterface,
  ParkingLotInterface
} from "../../shared/models/collections";


const timestamp = firebase.firestore.FieldValue.serverTimestamp();
@Component({
  selector: 'page-h-Lot',
  templateUrl: 'h-Lot.html'
})
export class HLotPage {
  private latNumber: number;
  private longNumber: number;
  private userID: string = "test@ggc.edu";
  private locationName: string = "none";
  private parkingLotName: string = "none";
  isHlotCrossed : any;

  //let longString;

  // OBSERVABLES
  locationObs: Observable<LocationInterface[]>;
  parkingLotObs: Observable<ParkingLotInterface[]>;
  userObs: Observable<UserInterface>;
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
    private afDatabase: AngularFireDatabase,
    //private afAuth: AngularFireAuth,
  ) {
    // FIREBASE CONNECTION TO COLLECTIONS
    this.userCollectionRef = this.afs.collection('user'); 
    this.locationCollectionRef = this.afs.collection('location'); 
    this.parkingLotCollectionRef = this.afs.collection('parkingLot');

    // FIREBASE CONNECTION TO DOCUMENTS
    firebase.firestore().collection('/user').get().then(snapshot => {
      snapshot.forEach(doc => {
        if ( doc.data().email === firebase.auth().currentUser.email ) {
          this.userID = doc.id;
          console.log('fetchUser.email:', doc.data().email);
        }
      })
    })
    this._locationService.getData.subscribe((entered) => {
        this.isHlotCrossed = entered;
        if(this.isHlotCrossed){
         console.log('crossed enter');
         this.parkedConfirmation();

        }
        else if (this.isHlotCrossed == false){
            console.log('crossed exit');

            this.unparkUser();
        }
      });
    console.log('userID:', this.userID);
    this.userDocumentRef = this.afs.collection('user').doc(this.userID);
    this.locationDocumentRef = this.afs.collection('location').doc('none');
    this.hLotDocumentRef = this.afs.collection('parkingLot').doc('h-Lot');

    // USED IN HTML - listener?
    this.locationObs = this.locationCollectionRef.valueChanges();
    this.parkingLotObs = this.parkingLotCollectionRef.valueChanges();
    this.userObs = this.userDocumentRef.valueChanges();
    this.hLotObs = this.hLotDocumentRef.valueChanges();
  }

  userDocRefID: firebase.firestore.DocumentReference = firebase.firestore().collection('/user').doc(this.userID);
  locationDocRefID: firebase.firestore.DocumentReference = firebase.firestore().collection('/location').doc(this.locationName);
  parkingLotDocRefID: firebase.firestore.DocumentReference = firebase.firestore().collection('/parkingLot').doc(this.parkingLotName);

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

  getLocation() {
    let currentLOC = this._geoLocation.getCurrentPosition();
    return currentLOC;
  }

  moveCamera(loc: LatLng) {
    let options: CameraPosition<LatLng> = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(options)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad hLotPage');
  }

   showMarker(){
    this.map.clear();
    let newLoc = new LatLng(this._locationService.lat,this._locationService.lng);

    this.createMarker(newLoc,'newMarker Car').then((marker : Marker) =>{
        marker.showInfoWindow();
        console.log('print get Location');

        //console.log('print get Location' + loc);
       // presentToast("blah " +latString);

    }).catch(err =>{
        console.log(err);
    });
    this.moveCamera(newLoc);

    //this._locationService.startTracking();
   //this.presentToast(this._locationService.lat,this._locationService.lng);
   // this.localNotification(this._locationService.lat,this._locationService.lng);
    }
    showToast(tempB : boolean){
    let count= 1;
    this._local.schedule({
        id: 1,
        title: 'Local ILocalNotification Example',
        text: 'entered '+ tempB
      });
    console.log("print pressed button");
    }
    parkedConfirmation(){ 
    let TIME_IN_MS = 60000;
    console.log('time out ');
    this.parkUser();

    let carInLot = setTimeout( () => {
         console.log('time out ended ')
         this.showMarker();
    }, TIME_IN_MS);
    }

    pressButtonTest(){
    this.parkedConfirmation();
    this.showToast(this._locationService.isEnterHLot)
    }

  start() {
    this._locationService.startTracking();
  }

  stop() {
    this._locationService.stopTracking();
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
    console.log("~~~~~~~~~~ FUNCTION parkUser called ", this.userID);

    var factor = Math.pow(10, 8);
    var myLat = this._locationService.lat;
    var myLng = this._locationService.lng;

    if ( myLat != 0 ) {
      myLat = Math.round(myLat * factor) / factor
    }

    this.userCollectionRef.doc(this.userID).update({
      isParked: true,
      parkedLocation: this.createLocation( myLat, myLng),
      parkedLot: this.calcParkingLot(), 
      parkedTime: timestamp
    }).then(result => {
      this.updateParkingLotPopulation(1);
    }).catch(function (error) {
      console.log("~~~~~~~~~~ FUNCTION parkUser error ", error);
    });
  }

  unparkUser() {
    console.log("~~~~~~~~~~ FUNCTION unparkUser called ", this.userDocumentRef);

    this.deleteLocation();
    this.parkingLotDocRefID = this.parkingLotCollectionRef.doc("none").ref;

    this.userDocumentRef.update({
      isParked: false,
      parkedLocation: this.locationDocRefID, //'/location/none',
      parkedLot: this.parkingLotDocRefID, //'/parkingLot/none',
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

    this.locationCollectionRef.add({
      lat: lat,
      long: long
    }).then(result => {
      console.log("~~~~~~~~~~ FUNCTION createLocation successful - ID: ", result.id);

      this.locationName = result.id
      this.locationDocRefID = firebase.firestore().collection('/location').doc(this.locationName);
      return this.locationDocRefID;
    }).catch(function (error) {
      console.error("~~~~~~~~~~ FUNCTION createLocation error ", error);
    });

    return firebase.firestore().collection('/location').doc('/none');
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

    this.locationDocRefID = firebase.firestore().collection('/location').doc(this.locationName);
    return this.locationDocRefID;
  }


  // COLLECTION FUNCTIONS  |  PARKINGLOT
  calcParkingLot() {
    console.log("~~~~~~~~~~ FUNCTION calcParkingLot called");

    //figure out the lot...
    this.parkingLotName = "h-Lot";
    this.parkingLotDocRefID = firebase.firestore().collection('/parkingLot').doc(this.parkingLotName);
    return this.parkingLotDocRefID; //"/parkingLot/h-Lot";
  }

  updateParkingLotPopulation(change: number) {
    console.log("~~~~~~~~~~ FUNCTION updateParkingLotPopulation called");

    var parkingLot = this.afs.collection('parkingLot').doc('h-Lot').ref;

    this.afs.firestore.runTransaction(function (transaction) {
      return transaction.get(parkingLot).then(function (doc) {
        if (!doc.exists) {
          throw "Document does not exist!";
        }

        // Add one person to the parkingLot population
        var newPopulation = doc.data().plPopulation + change;
        var newPct = 100 - Math.round((newPopulation / doc.data().plCapacity) * 100.00);
        transaction.update(parkingLot, { plPopulation: newPopulation, plAvailablePct: newPct });
      });
    }).then(result => {
      console.log('Transaction success!');
    }).catch(function (error) {
      console.log('Transaction failure:', error);
    });
  }

}
