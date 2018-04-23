import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController,
  NavParams
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { TabsPage } from '../tabs/tabs';
import { DaysurveyPage } from '../daysurvey/daysurvey';

 
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'signup'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
    else {
      this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(DaysurveyPage);
          });
        }, (error) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  // COLLECTION FUNCTIONS  |  USER
  /*
  createUser() {
    console.log("~~~~~~~~~~ FUNCTION createUser called ", this.userDocRefID);

    this.locationDocRefID = this.locationCollectionRef.doc("none").ref;
    this.parkingLotDocRefID = this.parkingLotCollectionRef.doc("none").ref;

    this.userCollectionRef.add({
      isParked: false,
      parkedLocation: this.locationDocRefID,
      parkedLot: this.parkingLotDocRefID,
      parkedTime: timestamp
    })
      .then(function (docRef) {
        this.userDocRefID = docRef;
        console.log("~~~~~~~~~~ FUNCTION createUser successful - ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("~~~~~~~~~~ FUNCTION createUser error ", error);
      });
  }
  */
}
