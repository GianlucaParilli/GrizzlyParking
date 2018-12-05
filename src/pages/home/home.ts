import { HLotPage } from './../h-lot/h-lot';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
//import { GeoPoint } from '@google-cloud/firestore';
//import { GeoPoint } from '@firebase/firestore-types';
//import { BackgroundMode} from '@ionic-native/background-mode';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocationtrackerProvider } from '../../providers/locationtracker/locationtracker';



interface UserInterface {
  isParked: boolean,  
  parkedLatitude: number,
  parkedLongitude: number,
  parkedTime: firebase.firestore.FieldValue         //MUST BE TYPE:  TimeStamp. a number represents millisecs since 01/01/1970
}                           //PLAN: treat as a number, which is what the firestore timestamp says is its format.

interface LocationInterface {
  latitude: number,  
  longitude: number,
}

interface LotAreaInterface {
  capacity: number,
  parkedUsers: AngularFirestoreCollection<UserInterface>,
}

interface ParkingLotInterface {
  entrances: AngularFirestoreCollection<LocationInterface>,
  exits: AngularFirestoreCollection<LocationInterface>,
  lotAreas: AngularFirestoreCollection<LotAreaInterface>,
  percentAvailable: number
}

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // OBSERVABLES
  users:       Observable<UserInterface[]>;
  locations:   Observable<LocationInterface[]>;
  lotAreas:    Observable<LotAreaInterface[]>;
  parkingLots: Observable<ParkingLotInterface[]>;

  // COLLECTION REFERENCES
  
  userCollectionRef:       AngularFirestoreCollection<UserInterface>;
  locationCollectionRef:   AngularFirestoreCollection<LocationInterface>;
  lotAreaCollectionRef:    AngularFirestoreCollection<LotAreaInterface>;
  parkingLotCollectionRef: AngularFirestoreCollection<ParkingLotInterface>;
  

  constructor(public navCtrl: NavController, 
   
    public afAuth: AngularFireAuth, 
     public afs:    AngularFirestore,
    // public background: BackgroundMode,

    //public localNoti : LocalNotifications, 
    //public backgroundMode : BackgroundMode,
    
    public location: LocationtrackerProvider

    ) {

      // FIREBASE CONNECTION TO COLLECTIONS
      //this.afAuth.auth.signInAnonymously();
      this.userCollectionRef       = this.afs.collection('user');
      this.locationCollectionRef   = this.afs.collection('location'); 
      this.lotAreaCollectionRef    = this.afs.collection('lotArea'); 
      this.parkingLotCollectionRef = this.afs.collection('parkingLot');

      // USED IN HTML - listener?
      this.users = this.userCollectionRef.valueChanges();
      this.locations = this.locationCollectionRef.valueChanges();
      this.lotAreas = this.lotAreaCollectionRef.valueChanges();
      this.parkingLots = this.parkingLotCollectionRef.valueChanges();
  }

  ionViewDidLoad() {
    this.location.startTracking();
    this.backgroundModes();

  }
  // PAGE NAVIGATION  |  H-Lot  -->  Login (returns after closing)
  goToHLotPage() {
    this.navCtrl.push(HLotPage);
  }

  goToLoginPage(){
    this.navCtrl.push(LoginPage);
  }


  // COLLECTION FUNCTIONS  |  USER
  userDocRefID: string;

  createUser( isParked: boolean, parkedLatitude: number, parkedLongitude: number ) {
    console.log("~~~~~~~~~~ FUNCTION createUser called ", this.userDocRefID);
    
    this.userCollectionRef.add({
      isParked: isParked,
      parkedLatitude: parkedLatitude,
      parkedLongitude: parkedLongitude,
      parkedTime: timestamp
    })
    .then(function(docRef) {
      this.userDocRefID = docRef.id;
      console.log("~~~~~~~~~~ FUNCTION createUser successful - ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("~~~~~~~~~~ FUNCTION createUser error ", error);
    });
  }

  parkUser( user: UserInterface, latitude: number, longitude: number, determinedLotArea: string ) {
    console.log("~~~~~~~~~~ FUNCTION parkUser called ", this.userDocRefID);

    this.userCollectionRef.doc(this.userDocRefID).update({ 
      isParked: false,
      parkedLatitude: latitude,
      parkedLongitude: longitude,
      parkedTime: timestamp
    })
    .catch(function(error) {
      console.log("~~~~~~~~~~ FUNCTION parkUser error ", error);
    });

    this.assignLotArea( determinedLotArea );
  }

  unparkUser( user: UserInterface ) {
    console.log("~~~~~~~~~~ FUNCTION unparkUser called ", this.userDocRefID);

    this.userCollectionRef.doc(this.userDocRefID).update({ 
      isParked: true, 
      parkedLatitude: 33.0,
      parkedLongitude: -84.0,
      parkedTime: timestamp
    })
    .catch(function(error) {
      console.log("~~~~~~~~~~ FUNCTION unparkUser error ", error);
    });
  }

  deleteUser( user: UserInterface ) {
    console.log("~~~~~~~~~~ FUNCTION deleteUser called");

    this.userCollectionRef.doc(this.userDocRefID).delete()
    .then(function() {
      console.log("~~~~~~~~~~ FUNCTION deleteUser successful");
      this.userDocRefID = "";
    })
    .catch(function(error) {
      console.log("~~~~~~~~~~ FUNCTION deleteUser error ", error);
    });
  }


  // COLLECTION FUNCTIONS  |  LOCATION
  locationDocRefID: string;

  createLocation( latitude: number, longitude: number ) {
    console.log("~~~~~~~~~~ FUNCTION createLocation called ", this.locationDocRefID);
    
    this.locationCollectionRef.add({
      latitude: latitude,
      longitude: longitude
    })
    .then(function(docRef) {
      this.locationDocRefID = docRef.id;
      console.log("~~~~~~~~~~ FUNCTION createLocation successful - ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("~~~~~~~~~~ FUNCTION createLocation error ", error);
    });
  }

  deleteLocation( location: LocationInterface) {
    console.log("~~~~~~~~~~ FUNCTION deleteLocation called");

    this.locationCollectionRef.doc(this.locationDocRefID).delete()
    .then(function() {
      console.log("~~~~~~~~~~ FUNCTION deleteLocation successful");
      this.locationDocRefID = "";
    })
    .catch(function(error) {
      console.log("~~~~~~~~~~ FUNCTION deleteLocation error ", error);
    });
  }


  // COLLECTION FUNCTIONS  |  LOTAREA
  lotAreaDocRefID: string; // h1 or h2 | for testing, use h1


  assignLotArea( determinedLotArea: string ) {
    this.lotAreaDocRefID = "h1"; //for testing, we need a function to determine map logic
    //this.lotAreaDocRefID = "h2";
  }

  addUserFromLotArea( user: UserInterface ) {
    console.log("~~~~~~~~~~ FUNCTION addUserFromLotArea called");

    this.lotAreaCollectionRef.doc(this.lotAreaDocRefID).collection('users').doc(this.userDocRefID).delete()
    .then(function() {
      console.log("~~~~~~~~~~ FUNCTION addUserFromLotArea successful");

      var parkingLotRef = this.parkingLotCollectionRef.doc("hLot");
      // In a transaction, add the new rating and update the aggregate totals
      // Compute new number of ratings
      var newParkingLotPopulation = parkingLotRef.data().parkingLotPopulation + 1;
      var newParkingLotCapacity = parkingLotRef.data().parkingLotCapacityn + 1;

      // Compute new percent available
      var newPercent = 100 - (( parkingLotRef.data().parkingLotPopulation / parkingLotRef.data().parkingLotCapacity) * 100);

      // Commit to Firestore
      parkingLotRef.update({
          parkingLotPopulation: newParkingLotPopulation,
          percentAvailable: newPercent
      })
      .catch(function(error) {
        console.log("~~~~~~~~~~ FUNCTION addUserFromLotArea - update parkingLot numbers error ", error);
      });

    })
    .catch(function(error) {
      console.log("~~~~~~~~~~ FUNCTION addUserFromLotArea error ", error);
    });
  }

  removeUserFromLotArea( user: UserInterface ) {
    console.log("~~~~~~~~~~ FUNCTION removeUserFromLotArea called");

    this.lotAreaCollectionRef.doc(this.lotAreaDocRefID).collection('users').doc(this.userDocRefID).delete()
    .catch(function(error) {
      console.log("~~~~~~~~~~ FUNCTION removeUserFromLotArea error ", error);
    });
  }
  localNotification(lat: number,long: number){
    let count= 1;
    /*
      this.localNoti.schedule({
          id: 1,
          title: 'Local ILocalNotification Example',
          text: 'lat: '+ lat + 'long: '+ long
        });
     */
  }
  backgroundModes(){
    console.log('background mode')
    //this.backgroundMode.enable();
    /*
    this.backgroundMode.on("activate").subscribe(()=>{
      this.localNotification(this.location.lat,this.location.lng) 
    });
    */
  }

  
}
