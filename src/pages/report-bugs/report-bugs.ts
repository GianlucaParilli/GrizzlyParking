import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { 
  IonicPage, 
  NavController,
  AlertController, 
  NavParams } from 'ionic-angular';
  import {
    Validators, 
    FormBuilder, 
    FormGroup 
  } from '@angular/forms';
import { HomePage } from '../home/home';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


/**
 * Generated class for the ReportBugsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

@IonicPage()
@Component({
  selector: 'page-report-bugs',
  templateUrl: 'report-bugs.html',
})
export class ReportBugsPage {

  private reportBugForm : FormGroup;
  private userID: any;  
  private platformOS : any;
  private versionOS : any;
  private model : any;
  private manufacturer : any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl : AlertController,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private afDatabase: AngularFireDatabase,
    private device : Device, 
    public navParams: NavParams) {
      //create formgroup to get values
      this.reportBugForm = formBuilder.group({
        bug : ['']
      });

      this.platformOS = this.device.platform;
      this.versionOS = this.device.version;
      this.model = this.device.model;
      this.manufacturer = this.device.manufacturer;

      //get current userID from documents in firestore
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
    console.log('ionViewDidLoad ReportBugsPage');
  }

  submitBug(){
    console.log('Submitting Bug: ' , this.reportBugForm.value.bug);
    
    //write to firestore
    this.afs.collection('bugs').add({
      userID : this.userID,
      timeSubmitted : timestamp,
      platform : this.platformOS,
      version : this.versionOS,
      model : this.model,
      manufacturer : this.manufacturer,
      bug : this.reportBugForm.value.bug
    })
    .then((result) => {
      console.log("Document added with id: ", result.id);
    })
    .then((error) => {
      console.error("Error adding document: ", error);
    })
    //create alert to tell user that it succeeded
    let alert = this.alertCtrl.create({
      message: "Bug successfully reported",
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
    //push user back to home page
    this.navCtrl.push(HomePage);
  }

}
