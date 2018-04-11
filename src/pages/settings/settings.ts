import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { DaysurveyPage } from '../daysurvey/daysurvey';
import { UpdateSurveyPage } from '../update-survey/update-survey';
import { AngularFireAuth } from 'angularfire2/auth';
import { ResetPasswordPage } from '../reset-password/reset-password';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public email: any;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public navParams: NavParams) {
      var user = afAuth.authState.subscribe(res => {
        if(res && res.uid){
          console.log('User is logged in');
          this.email = res.email;
        }
        else{
          console.log('User is not logged in');
        }
      })
  }

  logoutUser() {
    firebase.auth().signOut();
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

  goToUpdateSchedule(){
    this.navCtrl.push(UpdateSurveyPage);
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

}
