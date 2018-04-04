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

/**
 * Generated class for the DaysurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daysurvey',
  templateUrl: 'daysurvey.html',
})
export class DaysurveyPage {

  //FormGroup
  private timeSurveyFormGroup: FormGroup;

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaysurveyPage');
  }

  //helper function to simply display form data into console
  logForm(){
    console.log(this.timeSurveyFormGroup.value)
  }

  submitTimes(){
    
  }


}
