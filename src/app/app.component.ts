import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';
import { TabsPage } from '../pages/tabs/tabs';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
//import { GeoPoint } from '@google-cloud/firestore';
//import { GeoPoint } from '@firebase/firestore-types';

interface UserInterface {
  isParked: boolean,  
  parkedLatitude: number,
  parkedLongitude: number,
  parkedTime: firebase.firestore.FieldValue        //MUST BE TYPE:  TimeStamp. a number represents millisecs since 01/01/1970
}                           //PLAN: treat as a number, which is what the firestore timestamp says is its format.

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TabsPage;
  // Observable is the actual firebase db collection name: user
  users: Observable<UserInterface[]>;
  userCollectionRef: AngularFirestoreCollection<UserInterface>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public afAuth: AngularFireAuth, 
    public afs: AngularFirestore) {

    this.afAuth.auth.signInAnonymously();
    this.userCollectionRef = this.afs.collection('user'); 
    this.users = this.userCollectionRef.valueChanges();
      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  userDocRefID: string;

  createUser(isParked: boolean, parkedLatitude: number,
    parkedLongitude: number) {
    console.log("~~~~~~~~~~ FUNCTION createUser called ", this.userDocRefID);
    
    this.userCollectionRef.add({
      isParked: isParked,
      parkedLatitude: parkedLatitude,
      parkedLongitude: parkedLongitude,
      parkedTime: timestamp,
    })
    .then(function(docRef) {
      this.userDocRefID = docRef.id;
      console.log("~~~~~~~~~~ FUNCTION createUser successful - ID: ", docRef.id);
      this.userDocRefID.update({ updatedAt: timestamp })
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
