import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// FIREBASE ITEM
// TODO: Add parking lot items
//       Allowing the addition of all the other lots
//       Will need to change the data type - NOT A LIST...
// ADD TO CONSTRUCTOR:
//   constructor(public navCtrl: NavController,
//     public navParams: NavParams,
//     afDatabase: AngularFireDatabase) {
//       this.parkingLots = afDatabase.list('/parkingLots').valueChanges();
//   }
// parkingLots: AngularFireList<any>;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
