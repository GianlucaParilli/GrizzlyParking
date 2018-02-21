import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import {GoogleMaps, GoogleMap, CameraPosition,
        LatLng,GoogleMapsEvent, Marker, MarkerOptions} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


/*
  Generated class for the hLot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
// FIREBASE ITEM
// H-LOT has 2 lot areas, h1 and h2.
// lotArea: AngularFireList<any>;

@Component({
    selector: 'page-h-Lot',
    templateUrl: 'h-Lot.html'
})
export class HLotPage {
    private latNumber: number;
    private longNumber: number;


    @ViewChild('map') mapElement: ElementRef;
    map: GoogleMap;
    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                private _googleMaps: GoogleMaps,
                private _geoLocation: Geolocation,
                private _toast: Toast,
                private _toastCtrl: ToastController,
                public alertCtrl: AlertController,
                afDatabase: AngularFireDatabase
                ) { 
                    // the list of lotAreas...
                    // this.lotArea = afDatabase.list('/lotArea').valueChanges();
                }
    ngAfterViewInit(){
        
        this.initMap();
        let loc: LatLng;
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.getLocation().then(res =>{
                loc = new LatLng(res.coords.latitude, res.coords.longitude);
                //this.tesss = res.coords.latitude;
                this.latNumber = res.coords.latitude;
                this.longNumber = res.coords.longitude;

                this.pinPointLocation();
                this.moveCamera(loc);

                this.createMarker(loc,"My Car").then((marker : Marker) =>{
                    marker.showInfoWindow();
                    console.log('print get Location');

                    //console.log('print get Location' + loc);
                   // presentToast("blah " +latString);

                }).catch(err =>{
                    console.log(err);
                })
            }).catch(err =>{
                console.log(err);
            });
        });
    
        //get actual location
        this.getLocation().then(res =>{
            //console.log(res.coords.latitude);
        });
   
    }
    initMap(){
        let element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element);
    }

    pinPointLocation(){
        console.log('print get latitude ' + this.latNumber);
        console.log('print get longitude ' + this.longNumber);


      }

    createMarker(loc: LatLng, title: string){
        let markerOptions: MarkerOptions= {
            position:loc, 
            title: title
        };
        return this.map.addMarker(markerOptions);
    }
    getLocation(){
        let currentLOC = this._geoLocation.getCurrentPosition();

         return currentLOC;
         

    }
    moveCamera(loc: LatLng){
        let options: CameraPosition<LatLng> = {
            target: loc,
            zoom: 15, 
            tilt:10
        }
        this.map.moveCamera(options)
    }
   

    ionViewDidLoad() {
        console.log('ionViewDidLoad hLotPage');
    }

    showToast(){
        console.log("print pressed button");
       // pinPointLocation();
    }


    presentToast() {
        let toast = this._toastCtrl.create({
          message: 'latitude: '+this.latNumber +' Longitude: '+ this.longNumber,
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
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
