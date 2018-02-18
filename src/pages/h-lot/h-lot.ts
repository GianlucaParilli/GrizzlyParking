import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the HLotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// FIREBASE ITEM
// H-LOT has 2 lot areas, h1 and h2.
lotArea: AngularFireList<any>;

@IonicPage()
@Component({
  selector: 'page-h-lot',
  templateUrl: 'h-lot.html',
})
export class HLotPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    afDatabase: AngularFireDatabase) {
      //the list of lotAreas...
      this.lotArea = afDatabase.list('/lotArea').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HLotPage');
  }

  parkedConfirmation(lot){ //int googleMapsLocation){
    let prompt = this.alertCtrl.create({
      title: 'Parked Vehicle Confirmation',
      message: "Have you parked?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('~~~~~ BUTTON CLICKED: CAR NOT PARKED (NO)');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log('~~~~~ BUTTON CLICKED: CAR PARKED (YES)');
            this.updateLot(lot, 1);
          }
        }
      ]
    })
  }

  updateLot(lot: string, update: number){
    // do a toast... lookup how to do that
    // update db (add or subtract as needed)
    handler: data => {
      this.lotArea.update(lot, XXX
    });
  }

}
