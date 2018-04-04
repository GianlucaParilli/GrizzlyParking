import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { 
  AngularFireDatabase, 
  AngularFireList 
} from 'angularfire2/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { SurveyTimeInterface } from '../../shared/models/collections';
import {
  Validators, 
  FormBuilder, 
  FormGroup 
} from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase';

/**
 * Generated class for the DaysurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
@IonicPage()
@Component({
  selector: 'page-daysurvey',
  templateUrl: 'daysurvey.html',
})
export class DaysurveyPage {

  //FormGroup
  private timeSurveyFormGroup: FormGroup;
  private userID: any;
  

  //OBSERVABLES

  //COLLECTION REFERENCES
  mondayCollectionRef: AngularFirestoreCollection<SurveyTimeInterface[]>;
  tuesdayCollectionRef: AngularFirestoreCollection<SurveyTimeInterface[]>;
  wednesdayCollectionRef: AngularFirestoreCollection<SurveyTimeInterface[]>;
  thursdayCollectionRef: AngularFirestoreCollection<SurveyTimeInterface[]>;
  fridayCollectionRef: AngularFirestoreCollection<SurveyTimeInterface[]>;
  saturdayCollectionRef: AngularFirestoreCollection<SurveyTimeInterface[]>;


  constructor(
    public navCtrl: NavController,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private afDatabase: AngularFireDatabase, 
    public navParams: NavParams) {
      //initilize formgroup to hold values from form
      //this must have some sort of checker to ignore days with toggle = false
      //checker must also check if time ended is before time started to avoid problems
      this.timeSurveyFormGroup = formBuilder.group({
        mondayToggle : ['false'],
        mondayStartTime : [''],
        mondayEndTime: [''],
        tuesdayToggle : ['false'],
        tuesdayStartTime : [''],
        tuesdayEndTime : [''],
        wednesdayToggle: ['false'],
        wednesdayStartTime: [''],
        wednesdayEndTime: [''],
        thursdayToggle: ['false'],
        thursdayStartTime: [''],
        thursdayEndTime: [''],
        fridayToggle : ['false'],
        fridayStartTime: [''],
        fridayEndTime: [''],
        saturdayToggle : ['false'],
        saturdayStartTime: [''],
        saturdayEndTime: ['']
      });
      //Collection connections to firestore
      this.mondayCollectionRef = this.afs.collection('mondayTimes');
      this.tuesdayCollectionRef = this.afs.collection('tuesdayTimes');
      this.wednesdayCollectionRef = this.afs.collection('wednesdayTimes');
      this.thursdayCollectionRef = this.afs.collection('thursdayTimes');
      this.fridayCollectionRef = this.afs.collection('fridayTimes');
      this.saturdayCollectionRef = this.afs.collection('saturdayTimes');

      firebase.firestore().collection('/user').get().then(snapshot => {
        snapshot.forEach(doc => {
          if ( doc.data().email === firebase.auth().currentUser.email ) {
            this.userID = doc.id;
            console.log('fetchUser.id:', doc.data().id);
          }
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaysurveyPage');
  }

  //helper function to simply display form data into console
  logForm(){
    console.log(this.timeSurveyFormGroup.value)
  }

  

  submitTimes(){
    this.logForm();
    //write to firestore
    //checks to see if toggle is set to true for each day
    if(this.timeSurveyFormGroup.value.mondayToggle == true){
      this.afs.collection('mondayTimes').add({
        userID : this.userID,
        startTime : this.timeSurveyFormGroup.value.mondayStartTime,
        endTime : this.timeSurveyFormGroup.value.mondayEndTime,
        timeSubmitted : timestamp
      })
      .then((result) => {
        console.log("Document addded with id:Monday >>> ", result.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
    
    if(this.timeSurveyFormGroup.value.tuesdayToggle == true){
      this.afs.collection('tuesdayTimes').add({
        userID : this.userID,
        startTime : this.timeSurveyFormGroup.value.tuesdayStartTime,
        endTime : this.timeSurveyFormGroup.value.tuesdayEndTime,
        timeSubmitted : timestamp
      })
      .then((result) => {
        console.log("Document addded with id:Tuesday >>> ", result.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
  
    if(this.timeSurveyFormGroup.value.wednesdayToggle == true){
      this.afs.collection('wednesdayTimes').add({
        userID : this.userID,
        startTime : this.timeSurveyFormGroup.value.wednesdayStartTime,
        endTime : this.timeSurveyFormGroup.value.wednesdayEndTime,
        timeSubmitted : timestamp
      })
      .then((result) => {
        console.log("Document addded with id:Wednesday >>> ", result.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
    
    if(this.timeSurveyFormGroup.value.thursdayToggle == true){
      this.afs.collection('thursdayTimes').add({
        userID : this.userID,
        startTime : this.timeSurveyFormGroup.value.thursdayStartTime,
        endTime : this.timeSurveyFormGroup.value.thursdayEndTime,
        timeSubmitted : timestamp
      })
      .then((result) => {
        console.log("Document addded with id:Thursday >>> ", result.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
    
    if(this.timeSurveyFormGroup.value.fridayToggle == true){
      this.afs.collection('fridayTimes').add({
        userID : this.userID,
        startTime : this.timeSurveyFormGroup.value.fridayStartTime,
        endTime : this.timeSurveyFormGroup.value.fridayEndTime,
        timeSubmitted : timestamp
      })
      .then((result) => {
        console.log("Document addded with id:Friday >>> ", result.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
    
    if(this.timeSurveyFormGroup.value.saturdayToggle == true){
      this.afs.collection('saturdayTimes').add({
        userID : this.userID,
        startTime : this.timeSurveyFormGroup.value.saturdayStartTime,
        endTime : this.timeSurveyFormGroup.value.saturdayEndTime,
        timeSubmitted : timestamp
      })
      .then((result) => {
        console.log("Document addded with id:Saturday >>> ", result.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
    //push navigation to home page
    this.navCtrl.setRoot(TabsPage);
  }

  
}
