import { HLotPage } from './../h-lot/h-lot';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToHLotPage() {
    this.navCtrl.push(HLotPage);
  }

}
