import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

  }

  //Navigation
  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  //Firebase Logic for logging in
  logIn(){
    console.log(this.login.value);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
