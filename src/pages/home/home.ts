import { HLotPage } from './../h-lot/h-lot';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
//import { GeoPoint } from '@google-cloud/firestore';
//import { GeoPoint } from '@firebase/firestore-types';

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
    public afs:    AngularFirestore) {

<<<<<<< HEAD
      // FIREBASE CONNECTION TO COLLECTIONS
      this.afAuth.auth.signInAnonymously();
      this.userCollectionRef       = this.afs.collection('user');
      this.locationCollectionRef   = this.afs.collection('location'); 
      this.lotAreaCollectionRef    = this.afs.collection('lotArea'); 
      this.parkingLotCollectionRef = this.afs.collection('parkingLot');

      // USED IN HTML - listener?
=======
      //this.afAuth.auth.signInAnonymously();
      this.userCollectionRef = this.afs.collection('user'); 
>>>>>>> f738244ed20508e730a37a16c022e2f4bd0faba5
      this.users = this.userCollectionRef.valueChanges();
      this.locations = this.locationCollectionRef.valueChanges();
      this.lotAreas = this.lotAreaCollectionRef.valueChanges();
      this.parkingLots = this.parkingLotCollectionRef.valueChanges();
  }
  //Navigation
  goToHLotPage() {
    this.navCtrl.push(HLotPage);
  }

<<<<<<< HEAD
  // USER FUNCTIONS
=======
  goToLoginPage(){
    this.navCtrl.push(LoginPage);
  }


>>>>>>> f738244ed20508e730a37a16c022e2f4bd0faba5
  userDocRefID: string;

  createUser(isParked: boolean, parkedLatitude: number,
    parkedLongitude: number) {
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

  parkUser(user: UserInterface, latitude: number, longitude: number) {
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
  }

  unparkUser(user: UserInterface) {
    console.log("~~~~~~~~~~ FUNCTION unparkUser called ", this.userDocRefID);

    this.userCollectionRef.doc(this.userDocRefID).update({ 
      isParked: true, 
      parkedLatitude: 33.980466,
      parkedLongitude: -84.002062,
      parkedTime: timestamp
    })
    .catch(function(error) {
      console.log("~~~~~~~~~~ FUNCTION unparkUser error ", error);
    });
  }

  
}
