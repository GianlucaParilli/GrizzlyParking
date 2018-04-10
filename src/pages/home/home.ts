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
    public navCtrl: NavController) {

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
    }, 1000);
  }
  
  // PAGE NAVIGATION  |  H-Lot  -->  Login (returns after closing)
  goToHLotPage() { this.navCtrl.push(HLotPage); }
  goToLoginPage() { this.navCtrl.push(LoginPage); }

}
