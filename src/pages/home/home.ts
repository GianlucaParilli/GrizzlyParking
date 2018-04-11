import { HLotPage } from './../h-lot/h-lot';
import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { 
  AngularFireDatabase, 
  AngularFireList } from 'angularfire2/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ParkingLotInterface } from "../../shared/models/collections";
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocationtrackerProvider } from '../../providers/locationtracker/locationtracker';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  cardPercentage : any;
  cardColor : any;
  // OBSERVABLES
  parkingLotObs: Observable<ParkingLotInterface[]>;
  hLotObs: Observable<ParkingLotInterface>;

  // COLLECTION REFERENCES
  parkingLotCollectionRef: AngularFirestoreCollection<ParkingLotInterface>;
  hLotDocumentRef: AngularFirestoreDocument<ParkingLotInterface>;

  // CONSTRUCTOR
  constructor(
    private afs: AngularFirestore,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public background: BackgroundMode,
    public localNoti : LocalNotifications,
    public location: LocationtrackerProvider,
  ) {

    // FIREBASE CONNECTION TO COLLECTIONS
    this.parkingLotCollectionRef = this.afs.collection('parkingLot');

    // FIREBASE CONNECTION TO DOCUMENTS
    this.hLotDocumentRef = this.afs.collection('parkingLot').doc('h-Lot');

    // USED IN HTML |  LISTENERS
    this.parkingLotObs = this.parkingLotCollectionRef.valueChanges();
    this.hLotObs = this.hLotDocumentRef.valueChanges();

    this.hLotDocumentRef.ref.get().then((doc) =>{
      if(doc.exists){
        let myData = doc.data();
        this.cardPercentage = myData.plAvailablePct;

        //logic for changing card color with percentage
        if(this.cardPercentage >= 50){
          this.cardColor = "secondary";
        }
        else if(this.cardPercentage >= 25){
          this.cardColor = "caution";
        }
        else {
          this.cardColor = "danger";
        }
      }
      else{
        console.log('No Document exists');
      }
    }).catch(function(error){
      console.log('Error retreiving document: ', error);
    });

   

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.hLotDocumentRef.ref.get().then((doc) =>{
      if(doc.exists){
        let myData = doc.data();
        this.cardPercentage = myData.plAvailablePct;

        //logic for changing card color with percentage
        if(this.cardPercentage >= 50){
          this.cardColor = "secondary";
        }
        else if(this.cardPercentage >= 25){
          this.cardColor = "caution";
        }
        else {
          this.cardColor = "danger";
        }
      }
      else{
        console.log('No Document exists');
      }
    }).catch(function(error){
      console.log('Error retreiving document: ', error);
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }

  
  // PAGE NAVIGATION  |  H-Lot  -->  Login (returns after closing)
  goToHLotPage() { this.navCtrl.push(HLotPage); }
  goToLoginPage() { this.navCtrl.push(LoginPage); }
  
  ionViewDidLoad() {
    this.location.startTracking();
    this.backgroundModes();
  }
startTrack(){
  this.location.startTracking();
}
  localNotification(lat: number,long: number){
    let count= 1;
      this.localNoti.schedule({
          id: 1,
          title: 'Local ILocalNotification Example',
          text: 'lat: '+ lat + 'long: '+ long
        });
  }
  backgroundModes(){
    console.log('background mode')
    this.background.enable();
    this.background.on("activate").subscribe(()=>{
     // this.localNotification(this.location.lat,this.location.lng) 
     //this.startTrack();
    });
  }
  
}
