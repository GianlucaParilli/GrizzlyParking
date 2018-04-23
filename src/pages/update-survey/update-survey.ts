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
  selector: 'page-update-survey',
  templateUrl: 'update-survey.html',
})
export class UpdateSurveyPage {
  //FormGroup
  private timeSurveyFormGroup: FormGroup;
  private userID: any;

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
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateSurveyPage');
  }

}
